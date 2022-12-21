"use strict";

const { json } = require("body-parser");
const { query } = require("express");
const db = require("../config/db");
const Todo = require("./crud");

class TodoStorage {
  static inserting(body) {
    if (!body.content);
    const query = "INSERT INTO todos(description)  VALUES (?)";

    db.query(query, [body.content], function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    });
  }

  static loading() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM todos";
      db.query(query, function (err, result, fields) {
        if (err) {
          console.log(err);
        }
        resolve(result);
      });
    });
  }

  static checking(body) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE todos SET is_checked = (?) WHERE id = (?)";
      if (body.checked === true) {
        db.query(query, [1, body.id], function (err, result, fields) {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      } else {
        db.query(query, [0, body.id], function (err, result, fields) {
          if (err) {
            console.log(err);
          }
          resolve(result);
        });
      }
    });
  }

  static patching(body) {
    console.log(body.difference);
    return new Promise((resolve, reject) => {
      if (body.difference === "content") {
        console.log("content");
        const query = "UPDATE todos SET description = (?) WHERE ID = (?)";
        db.query(
          query,
          [body.content, body.id],
          function (err, result, fields) {
            if (err) {
              console.log(err);
            }
            resolve(result);
          }
        );
      } else if (body.difference === "check") {
        console.log("check");
        const query = "UPDATE todos SET is_checked = (?) WHERE id = (?)";
        if (body.checked == true) {
          db.query(query, [1, body.id], function (err, result, fields) {
            if (err) {
              console.log(err);
            }
            resolve(result);
          });
        } else if (body.checked == false) {
          db.query(query, [0, body.id], function (err, result, fields) {
            if (err) {
              console.log(err);
            }
            resolve(result);
          });
        }
      }
    });
  }

  static deleting(body) {
    const query = "DELETE FROM todos WHERE id = (?)";
    db.query(query, [body.id], function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = TodoStorage;
