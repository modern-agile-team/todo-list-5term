"use strict";

const hello = (req, res) => {
    res.render("home/index");

}
const login = (req,res) => {
    res.render("hoem/login");
}
module.exports = {
    hello,
    login
};