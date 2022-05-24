const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { userHandling } = require('../database/user_handling')
const { auth } = require("./middleware/auth");
const { databaseConnection } = require("../database/database_connection");
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello world!!!!"));

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

databaseConnection();

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
