"use strict";

const { createNullProtoObjWherePossible } = require("ejs/lib/utils");
const { response } = require("express");
const Todo = require("../../models/crud");
const TodoStorage = require("../../models/crudStorage");

// 클라이언트가 get요청으로 접속 하면 해당 페이지를 렌더링
const output = {
  hello: (req, res) => res.render("home/index"),

  todo: async (req, res) => {
    let todoList = await TodoStorage.loading();

    res.render("home/todo", { data: todoList });
  },
};

const todoctrl = {
  inserting: (req, res) => {
    const todo = new Todo(req.body);
    const response = todo.inserting();
    if (response.success === false) {
      return res.status(500).json(response);
    } else return res.status(200).json(response);
  },

  loading: (req, res) => {
    const todo = new Todo(req.body);

    const response = todo.loading();
    return res.json(response);
    // if (response.success === false) {
    //   return res.status(500).json(response);
    // } else return res.status(200).json(response);
  },

  getTodoList: () => {
    return TodoStorage.loading();
  },

  patching: (req, res) => {
    const todo = new Todo(req.body);

    const response = todo.patching();
    if (response.success === false) {
      return res.status(500).json(response);
    } else return res.status(200).json(response);
  },

  deleting: (req, res) => {
    const todo = new Todo(req.body);
    const response = todo.deleting();
    return res.json(response);
  },
};

//바깥에 주기
module.exports = {
  output,
  todoctrl,
};
