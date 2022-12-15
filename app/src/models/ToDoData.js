const db = require("../config/db");

class ToDoData {
  static getToDoList() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM todolist ", (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  static saveList(listInfo) {
    const sql = "INSERT INTO todolist (description) VALUES(?)";
    return new Promise((resolve, reject) => {
      db.query(sql, [listInfo.description], (err) => {
        if (err) {
          console.log("생성 실패");
          console.log(err);
          reject({ success: false, msg: "일정 생성 실패" });
        } else {
          console.log("생성 성공");
          resolve({ success: true });
        }
      });
    });
  }

  static editData(data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE todolist SET description= ?, is_check= 0 WHERE id= ?";
      db.query(sql, [data.description, data.id], (err) => {
        if (err) {
          console.log("수정 실패");
          console.log(err);
          reject({ success: false, msg: "일정 수정 실패" });
        } else {
          console.log("수정 성공");
          resolve({ success: true });
        }
      });
    });
  }

  static editCheck(data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE todolist SET is_check= ? WHERE id= ?";
      db.query(sql, [data.is_check, data.id], (err) => {
        if (err) {
          console.log(err);
          reject({ success: false, msg: "일정 수정 실패" });
        } else {
          resolve({ success: true });
        }
      });
    });
  }

  static deleteData(data) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM todolist WHERE id= ?";
      db.query(sql, [data.id], (err) => {
        if (err) {
          console.log("삭제 실패");
          console.log(err);
          reject({ success: false, msg: "일정 삭제 실패" });
        } else {
          console.log("삭제 성공");
          resolve({ success: true });
        }
      });
    });
  }
}
module.exports = ToDoData;
