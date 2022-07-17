const { User } = require("./models/user");

const loginHandling = {
    register: async (req, res) => {
        //post로 넘어온 데이터를 받아서 DB에 저장해준다
        const duplicateEmailCheck = await User.findOne({'email': req.body.email});
        if (duplicateEmailCheck) return res.json({ success: false, error: "이메일 중복" });
        const duplicateNameCheck = await User.findOne({'name': req.body.name});
        if (duplicateNameCheck) return res.json({ success: false, error: "이름 중복" });
        const duplicatePhoneNumberCheck = await User.findOne({'phone_number': req.body.phone_number});
        if (duplicatePhoneNumberCheck) return res.json({ success: false, error: "전화번호 중복" });
        req.body.birthday = new Date(req.body.birthday);
        console.log(req.body.birthday);
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
            phone_number: req.user.phone_number,
            birthday: req.user.birthday,
            address: req.user.address,
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

};

module.exports = { loginHandling };
