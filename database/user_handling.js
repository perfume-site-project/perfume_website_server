const { User } = require("./models/user");

const userHandling = {

    findid : (req, res) => {
        User.findOne({phone_number: req.body.phoneNumber}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            return res.json({email: user.email});
        });
    },

    findpw : (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            
            return res.json({id: user.password});
        });
    },
};

module.exports = { userHandling };
