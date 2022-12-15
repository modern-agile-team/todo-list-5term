"use strict";

const { createNullProtoObjWherePossible } = require("ejs/lib/utils");
const User = require("../../models/User");
const Todo = require("../../models/crud");
const TodoStorage = require("../../models/crudStorage");
// 아이디비번 임포트
const UserStorage = require("../../models/UserStorage");

// 클라이언트가 get요청으로 접속 하면 해당 페이지를 렌더링
const output = {
  hello: (req, res) => res.render("home/index"),

  login: (req, res) => {
    res.render("home/login");
  },

  todo: async (req, res) => {
    let a = await TodoStorage.loading();
    res.render("home/todo", { data: a });
  },
};

// 로그인 수행 코드
const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
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
    console.log(todo);
    const response = todo.loading();
    return res.json(response);
    // if (response.success === false) {
    //   return res.status(500).json(response);
    // } else return res.status(200).json(response);
  },

  getTodoList: () => {
    return TodoStorage.loading();
  },

  //deleting:
};

//바깥에 주기
module.exports = {
  output,
  process,
  todoctrl,
};
