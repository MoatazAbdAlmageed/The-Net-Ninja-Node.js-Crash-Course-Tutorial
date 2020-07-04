const Task = require("../models/task");
const create = (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.redirect("/");
  }
  const task = new Task({ title: title.trim(), status: false });
  task.save().then(() => {
    res.redirect("/");
  });
};
const read = (req, res) => {
  const completed = req.url == "/completed" ? true : false;
  tasks = Task.find()
    .sort({ createdAt: -1 })
    .where({ status: completed ? true : false })
    .then((tasks) => {
      res.render("tasks", {
        title: `[${tasks.length}] ${completed ? "Done" : "Todo"}`,
        tasks,
      });
    });
};
const update = (req, res) => {
  const { _id, title, status } = req.body;
  Task.findByIdAndUpdate(
    { _id },
    { title: title.trim(), status: status == "on" ? true : false }
  ).then(() => {
    res.redirect("/");
  });
};
const deleteItem = (req, res) => {
  Task.findByIdAndDelete(req.params.id).then(() => {
    res.json({ status: 200 });
  });
};
module.exports = { create, read, update, deleteItem };
