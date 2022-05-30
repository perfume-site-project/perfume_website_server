const { User } = require("./models/user");

const userInformation = {
    update: (req, res) => {
      console.log(req.user.id);
        User.updateOne({ id : req.user.id },{
            password : req.body.password,
            name : req.body.name,
            phone_number : req.body.name
        }  //auth로 먼저 인증 로그인된 아이디는 바로 변경가능
        )
        .then(user => {
            if (!user) {
                res.send({
                    message: "존재하지 않는 회원정보이므로 수정할 수 없습니다.",
                    status: 'fail'
                  });
            }
            res.send({
                message: "회원정보가 수정되었습니다.",
                status: 'success'
              });
          })
          .catch(err => {
            res.send({
              message: "오류가 발생하였습니다.",
              status: 'fail'
            });
            console.log(err);
          });
    }};

module.exports = { userInformation };