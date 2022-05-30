const { User } = require("./models/user");

const userHandling = {
    register: (req, res) => {
        //post로 넘어온 데이터를 받아서 DB에 저장해준다
        const user = new User(req.body);
        user.save((err, userInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({ success: true });
        });
    },

    login: (req, res) => {
        //로그인을 할 때 아이디와 비밀번호를 받는다
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err || !user) {
            return res.json({
                loginSuccess: false,
                message: "존재하지 않는 아이디입니다.",
            });
            }
            user.comparePassword(req.body.password)
            .then((isMatch) => {
                if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 일치하지 않습니다",
                });
                }
                //비밀번호가 일치하면 토큰을 생성한다
                user.generateToken()
                .then((user) => {
                    res.cookie("x_auth", user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id,
                    });
                }).catch((err) => res.status(400).send(err));
            });
        }).catch((err) => res.json({ loginSuccess: false, err }));
    },

    auth: (req, res) => {
        res.status(200).json({
            _id: req._id,
            isAdmin: req.user.role === 09 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image,
        });
    },

    logout: (req, res) => {
        User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
            if (err) return res.json({ success: false, err });
            res.clearCookie("x_auth");
            return res.status(200).send({
                success: true,
            });
        });
    },

    findid : (req, res) => {
        User.findById({email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                  message: "회원 정보가 없습니다.",
                });
                }
        return res.json({id : req.body.id});
        });
    },

    findpw : (req, res) => {
        User.findById({id: req.body.id}, {email: req.body.email}, (err, user) => {
            if (err || !user) {
                return res.json({
                  message: "회원 정보가 없습니다.",
                });
                }
            user.compareId(req.body.id)
            .then((isMatch) => {
                if (!isMatch) {
                return res.json({
                  message: "존재하지 않는 아이디입니다.",
                });
            }
        })
        return res.json({id : req.body.password});
        });
    }
};

module.exports = { userHandling };
