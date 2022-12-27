"use strict";
const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

// router.get("/", ctrl.output.todolist, ctrl.process.getToDoList);
router.get("/", ctrl.output.todolist);

router.post("/", ctrl.process.saveList);

router.patch("/", ctrl.process.editList);

router.delete("/", ctrl.process.deleteList);

module.exports = router;
