const { userHandling } = require('../database/user_handling')
const { auth } = require("./middleware/auth");


const userRouteConfig = (app) => {
  //id/pw 찾기
  app.post("/users/findid", (req, res) => {
    userHandling.findid(req, res);
  });

  app.post("/users/findpw", (req, res) => {
    userHandling.findpw(req, res);
  });

  app.get("/users/basket", (req, res) => {
    userHandling.basket(req, res);
  });
  
  app.get("/users/cartview", (req, res) => {
    userHandling.cartview(req, res);
  });

  app.get("/users/cartview/delete", (req, res) => {
    userHandling.delete(req, res);
  });
}

module.exports = { userRouteConfig };
