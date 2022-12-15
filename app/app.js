//모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//라우터
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
//URL을 통해 전달되는 데이터중 한글, 공백같은 문자가 포함될 경우 제대로 인식되지 않는 상황을 해결
app.use(express.urlencoded({ extended: true }));
app.use("/", home);
// app.get("/", ctrl.output.home, ctrl.process.getToDoList);

module.exports = app;
