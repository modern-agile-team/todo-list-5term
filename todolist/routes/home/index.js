"use strict"

const express = require("express");
const app = require("../../app");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.house);

router.get("/login", ctrl.login);

router.get("/todolist", ctrl.login);

module.exports = router;



