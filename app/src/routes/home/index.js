"use strict"

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");


router.get("/todolist", ctrl.todolist);

module.exports = router;



