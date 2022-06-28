const { User } = require("./models/user");

const userHandling = {

    findid : (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                    message: "회원 정보가 없습니다.",
                });
            }
            return res.json({id: user.id});
        });
    },

    findpw : (req, res) => {
        User.findOne({id: req.body.id}, (err, user) => {
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
