"use strict";

const db = require("../config/db");

class UserStorage {
    static async save(list) {
        return new Promise((resolve, reject) => {
            const querySave = "INSERT INTO lists(description) values(?);";
            const queryId = "SELECT LAST_INSERT_ID();";
            db.query(querySave,list.text,(err) => {if(err) alert(`${err}`)});
            db.query(
                queryId,
                (err,data) => {
                    if (err) reject(`${err}`);
                    resolve({ success: true, id: data});
                })
        })
    }

    static async getToDoList() {
        return new Promise((resolve, reject) => {
            const query = "select * from lists;";
            db.query(query, (err, list) => {
                if (err) reject(`${err}`);
                resolve({success: true, data: list});
            })
        })
    }

    static async Delete(list) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM lists WHERE id = (?);";
            db.query(
                query,
                list.li,
                (err) => {
                    if (err) reject(`${err}`);
                    resolve({ success: true });
                })
        })
    }

    static async update(list) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE lists SET description = (?) WHERE id = (?);"; 
            db.query(
                query,
                [list.text, list.id],
                (err) => {
                    if (err) reject(`${err}`);
                    resolve({ success: true });
                })
        })
    }
}

module.exports = UserStorage;