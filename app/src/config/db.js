const mysql = require("mysql");

const db = mysql.createConnection({
  host: "database-1.csckfhteg1sq.ap-northeast-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "Tjsdn8837!",
  database: "todos",
});

db.connect();

module.exports = db;
