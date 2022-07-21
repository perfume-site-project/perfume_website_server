const axios = require('axios');
const CryptoJS = require('crypto-js');
require("dotenv").config();

// Using NAVER Cloud Platform SMS Service

const serviceId = process.env.SENS_SERVICE_ID; 
const secretKey = process.env.SENS_SECRET_KEY;
const accessKey = process.env.SENS_ACCESS_KEY;
const my_number = process.env.SENS_MYNUM;

const method = "POST";
const space = " ";
const newLine = "\n";
const timestamp = Date.now().toString();
const url = `/sms/v2/services/${serviceId}/messages`;

const makeSignature = () => {
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	const hash = hmac.finalize();

	return hash.toString(CryptoJS.enc.Base64);
}

const sendMessage = async (user_phone_number, message) => {
    await axios({
        method: method,
        url: `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": timestamp,
            "x-ncp-apigw-signature-v2": makeSignature(),
        },
        data: {
            type: "SMS",
            countryCode: "82",
            from: my_number,
            content: `인증번호는 [${message}] 입니다.`,
            messages: [
                { to: `${user_phone_number}`, },],
        },
    }).then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
    return 400;
}

module.exports = sendMessage;
