"use strict";

const express = require("express");
const home = require("./src/routes/home");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
// 기본경로설정
app.use(express.static(`${__dirname}/src/public`));
app.use("/", home);

module.exports = app;
