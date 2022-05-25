const { userHandling } = require('../database/user_handling')
const { auth } = require("./middleware/auth");


const loginRouteConfig = (app) => {
  app.get("/hello", (req, res) => {
    res.send("안녕하세요");
  });
  
  app.post("/users/register", (req, res) => {
    userHandling.register(req, res);
  });
  
  app.post("/users/login", (req, res) => {
    userHandling.login(req, res);
  });
  
  //auth 미들웨어를 가져온다
  app.get("/users/auth", auth, (req, res) => {
    userHandling.auth(req, res);
  });
  
  //user_id를 찾아서 db에있는 토큰값을 비워준다
  app.post("/users/logout", auth, (req, res) => {
    userHandling.logout(req, res);
  });
}

module.exports = { loginRouteConfig };
