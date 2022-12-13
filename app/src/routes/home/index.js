"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.load, ctrl.output.home);

router.post("/", ctrl.process.addlist);

router.delete("/", ctrl.process.Delete);

router.patch("/", ctrl.process.correction);

module.exports = router;