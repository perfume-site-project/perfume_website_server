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

  app.get("/users/info", auth, (req, res) => {
    userHandling.info(req, res);
  });

  app.post("/users/update", auth, (req, res) => {
    userHandling.update(req, res);
  });

  app.post("/users/delete", auth, (req, res) => {
    userHandling.delete(req, res);
  });

  app.post("/users/cartview", auth, (req, res) => {
    userHandling.cartView(req, res);
  });

  app.post("/users/cartview/delete", auth, (req, res) => {
    userHandling.cartViewDelete(req, res);
  });

  app.post("/users/purchase", auth, (req, res) => {
    userHandling.purchase(req, res);
  });
}

module.exports = { userRouteConfig };
