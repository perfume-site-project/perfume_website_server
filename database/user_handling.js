const { User } = require("./models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userHandling = {

    findid: (req, res) => {
        User.findOne({phone_number: req.body.phoneNumber}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            return res.json({email: user.email});
        });
    },

    findpw: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            
            return res.json({password: user.password});
        });
    },

    update: async (req, res) => {
        if (req.body.password) {
            req.body.password = await genBcrypt(req.body.password);
        }
        User.updateOne({ email: req.user.email }, {
            $set: {
                "name": req.body.name ? req.body.name : req.user.name,
                "password": req.body.password ? req.body.password : req.user.password,
                "phone_number": req.body.phone_number ? req.body.phone_number : req.user.phone_number,
            },
        }, (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    },

    delete: (req, res) => {
        User.deleteOne({ email: req.user.email }, (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    },

    cartView: (req, res) => {
        User.findOne({ _id: req.user._id }, (err, user) => {
            if (err) return res.json({ success: false, err });
            /*if (user.cart_view.includes(req.body.productId)) {
                err = "There are duplicates";
                return res.json({ success: false, err });
            }*/
            User.updateOne({ _id: req.user._id }, {
                $push: {
                    "cart_view": { 
                        "productId": req.body.productId,
                        "count": req.body.count,
                        "cartViewId": Date.now(),
                    },
                },
            }, (err) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true });
            });
        });
    },

    cartViewDelete: (req, res) => {
        User.updateOne({ _id: req.user._id }, {
            $pull: {
                "cart_view": {
                    "cartViewId": req.body.cartViewId,
                },
            },
        }, (err) => {
            if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true });
        });
    },
};

async function genBcrypt(password) {
    let hashForPassword;
    await new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return reject(err);
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) return reject(err);
                hashForPassword = hash;
                resolve();
            });
        });
    });
    return hashForPassword;
}

module.exports = { userHandling };
