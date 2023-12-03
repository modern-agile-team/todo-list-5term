const { text } = require("express");
const db = require("../config/db");

class ToDoData {
  static getToDoList() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM todolist ";
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }

  static saveList(text) {
    const sql = "INSERT INTO todolist (description) VALUES(?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [text], (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "일정 생성 실패" });
        }
        console.log("생성 성공");
        resolve({ success: true });
      });
    });
  }

  static editData(data) {
    return new Promise((resolve, reject) => {
      const id = data.id;
      let sql;
      let update;
      if (data.is_check == 0 || data.is_check == 1) {
        sql = "UPDATE todolist SET is_check= ? WHERE id= ?";
        update = data.is_check;
      } else {
        sql = "UPDATE todolist SET description= ?, is_check= 0 WHERE id= ?";
        update = data.description;
      }

      db.query(sql, [update, id], (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "일정 수정 실패" });
        }
        console.log("수정 성공");
        resolve({ success: true });
      });
    });
  }

  static deleteData(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM todolist WHERE id= ?";
      db.query(sql, [id], (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "일정 삭제 실패" });
        }
        console.log("삭제 성공");
        resolve({ success: true });
      });
    });
  }

  static maxLetterLength(text) {
    const pattern1 = /[a-zA-Z]/; //영어
    const pattern2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
    if (pattern1.test(text) && pattern2.test(text)) {
      return 16;
    }
    if (pattern1.test(text)) {
      return 30;
    }
    if (pattern2.test(text)) {
      return 16;
    }
  }
}
module.exports = ToDoData;
