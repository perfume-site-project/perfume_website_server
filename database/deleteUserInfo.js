const { User } = require("./models/user");

const deleteUserInfo = {
    deleteuser: (req, res) => {
        User.findOne({
            where: {
              id: req.body.id,
              password: req.body.password,
              phone_number: req.body.phone_number,
              active: true
            },
          });
          if (!User) {
            User.destroy({
              truncate: true,
            });
            res.status(200).send('탈퇴가 완료되었습니다.');
          } else {
            res.status(500).send('오류가 발생하였습니다.');
          }
        }
    };

module.exports = { deleteUserInfo };