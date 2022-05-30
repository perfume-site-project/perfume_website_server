const { User } = require("./models/user");

const userInformation = {
    update: (req, res) => {
        User.updateOne({
            password : req.body.password,
            name : req.body.name,
            phone_number : req.body.name
        }, {
            where: { id : req.body.id }  
        })
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