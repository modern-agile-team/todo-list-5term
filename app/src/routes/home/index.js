"use strict";

const { createNextState } = require("@reduxjs/toolkit");
const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

//클라이언트 요청 받아오기
router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.post("/login", ctrl.process.login);

router.get("/todo", ctrl.output.todo);
router.get("/todo", ctrl.todoctrl.loading);
router.post("/todo", ctrl.todoctrl.inserting);

module.exports = router;
