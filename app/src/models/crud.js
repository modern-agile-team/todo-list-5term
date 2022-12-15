"use strict";

let TodoStorage = require("./crudStorage");

class Todo {
  constructor(body) {
    this.body = body;
  }
  inserting() {
    if (this.body.content.length <= 12) {
      TodoStorage.inserting(this.body);
      return { data: this.body, success: true };
    } else return { success: false, msg: "너무 깁니다." };
  }

  loading() {
    const toDoData = TodoStorage.loading(this.body);
    return { data: toDoData };
  }
}

module.exports = Todo;
