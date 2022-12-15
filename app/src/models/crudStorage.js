"use strict";

const { json } = require("body-parser");
const db = require("../config/db");
const Todo = require("./crud");

class TodoStorage {
  static inserting(body) {
    if (!body.id)
      db.query(
        "INSERT INTO todos (description) VALUES (?)",
        [body.content],
        function (err, result, fields) {
          if (err) {
            console.log(err);
          }
        }
      );
  }
  static loading() {
    return new Promise((resolve, rejrct) => {
      db.query("SELECT * FROM todos", function (err, result, fields) {
        if (err) {
          console.log(err);
        }
        // console.log("result :", result);
        resolve(result);
      });
    });
  }
}

module.exports = TodoStorage;
