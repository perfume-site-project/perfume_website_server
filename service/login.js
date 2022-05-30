const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { userHandling } = require('../database/user_handling')
const { userInformation } = require('../database/user_info')
const { deleteUserInfo } = require('../database/deleteUserInfo')
const { auth } = require("./middleware/auth");
const { databaseConnection } = require("../database/database_connection");
const cors = require("cors");
const { userInformation } = require("../database/user_info");
const { deleteUserInfo } = require("../database/deleteUserInfo");

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello world!!!!"));

app.get("/service/hello", (req, res) => {
  res.send("안녕하세요");
});

app.post("/service/users/register", (req, res) => {
  userHandling.register(req, res);
});


app.put("/service/users/login", (req, res) => {
  userHandling.login(req, res);
});

//auth 미들웨어를 가져온다
app.get("/service/users/auth", auth, (req, res) => {
  userHandling.auth(req, res);
});

//user_id를 찾아서 db에있는 토큰값을 비워준다
app.post("/service/users/logout", auth, (req, res) => {
  userHandling.logout(req, res);
});

//id/pw 찾기
app.post("/service/users/findid", (req, res) => {
  userHandling.findid(req, res);
});

app.post("/service/users/findpw", (req, res) => {
  userHandling.findpw(req, res);
});

//회원정보 수정
app.put("/service/users/{userId}", (req, res) => {
  userInformation.update(req, res);
});

//회원 탈퇴
app.delete("/service/users/{userId}", (req, res) => {
  deleteUserInfo.update(req, res);
});

databaseConnection();

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));