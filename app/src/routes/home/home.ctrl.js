"use sitrct";

const list = {
  text: ["asf", "asdf", "asdfg"],
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
};

const process = {
  addToDo: (req, res) => {
    const text = req.body.text;


  },
};

module.exports = {
  output,
  process,
};
