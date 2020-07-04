const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", (req, res) => {
  tasks = Task.find()
    .sort({ createdAt: -1 })
    .where({ status: 0 })
    .then((tasks) => {
      res.render("index", { title: `TODO [${tasks.length}]`, tasks });
    });
});

router.get("/tasks", (req, res) => {
  res.redirect("/");
});

router.get("/tasks/completed", (req, res) => {
  tasks = Task.find()
    .sort({ createdAt: -1 })
    .where({ status: 1 })
    .then((tasks) => {
      res.render("completed", { title: `Done [${tasks.length}]`, tasks });
    });
});
router.get("/tasks/show/:id", (req, res) => {
  tasks = Task.findById(`${req.params.id}`).then((task) => {
    res.render("show", { title: task.title, task });
  });
});

router.get("/tasks/create", (req, res) => {
  res.render("create", { title: "Create" });
});
router.post("/tasks/create", (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.redirect("/");
  }
  const task = new Task({ title: title.trim(), status: false });
  task.save().then(() => {
    res.redirect("/");
  });
});
router.put("/tasks/update", (req, res) => {
  const { _id, title, status } = req.body;
  Task.findByIdAndUpdate(
    { _id },
    { title: title.trim(), status: status == "on" ? true : false }
  ).then(() => {
    res.redirect("/");
  });
});
router.delete("/tasks/delete/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id).then(() => {
    res.json({ redirect: "/" });
  });
});
module.exports = router;
