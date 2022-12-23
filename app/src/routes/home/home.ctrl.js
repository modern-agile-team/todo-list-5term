"use strict";

const User = require("../../models/User");
let render = true;

const output = {
  load: async (req, res, next) => {
    if(render){
      render = false;
      next()
    }
    else{
      render = true;
      const user = new User();
      const response = await user.load();
      return res.json(response);  
    }
  },
  home: async (req, res, next) => {
    res.render("home/index");
  },

};

const process = {
  addlist: async (req, res) => {
    const list = new User(req.body);
    const response = await list.addlist();
    return res.json(response);
  },
  Delete: async (req, res) => {
    const list = new User(req.body);
    const response = await list.Delete();
    return res.json(response);
  },
  correction: async (req, res) => {
    const list = new User(req.body);
    const response = await list.correction();
    return res.json(response);
  },
}

module.exports = {
  output,
  process,
}