"use strict";

const house = (req, res) => {
    res.render("home/index");

}
const login = (req,res) => {
    res.render("hoem/login");


}
const todolist = (req,res) => {
    res.render("hoem/todolist");


}
module.exports = {
    house,
    login,
    todolist,
};