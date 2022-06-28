const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { loginRouteConfig } = require("./service/login");
const { productRouteConfig } = require("./service/product");
const { userRouteConfig } = require("./service/user");
const { databaseConnection } = require("./database/database_connection");
const cors = require("cors");


app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('static'));

loginRouteConfig(app);
productRouteConfig(app);
userRouteConfig(app);

app.get("/", (req, res) => res.send("Hello world!!!!"));

databaseConnection();

const port = 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
