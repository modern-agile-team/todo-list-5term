"use strict";

const express = require("express");
const app = express();
const home = require("./src/routes/home");


app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/",home);

module.exports = app;