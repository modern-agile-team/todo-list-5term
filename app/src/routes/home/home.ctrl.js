const { getToDoList } = require("../../models/ToDoData");
const ToDoData = require("../../models/ToDoData");
const ToDoList = require("../../models/ToDoList");

const output = {
  todolist: async (req, res) => {
    res.render("./home/index", { data: await process.getToDoList() });
  },
};

const process = {
  getToDoList: async () => {
    const response = await ToDoData.getToDoList();
    return response;
  },

  saveList: async (req, res) => {
    const list = new ToDoList(req.body);
    const response = await list.saveData();
    return res.json(response);
  },

  editList: async (req, res) => {
    const list = new ToDoList(req.body);
    const response = await list.editData();
    return res.json(response);
  },

  deleteList: async (req, res) => {
    const list = new ToDoList(req.body);
    const response = await list.deleteData();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
