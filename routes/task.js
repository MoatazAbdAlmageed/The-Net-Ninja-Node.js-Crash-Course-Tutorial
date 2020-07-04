const express = require("express");
const router = express.Router();
const {
  create,
  read,
  update,
  deleteItem,
} = require("../controllers/taskController");

router.get("/", (req, res) => {
  read(req, res);
});

router.get("/completed", (req, res) => {
  read(req, res);
});

router.post("/create", (req, res) => {
  create(req, res);
});

router.put("/update", (req, res) => {
  update(req, res);
});

router.delete("/delete/:id", (req, res) => {
  deleteItem(req, res);
});
module.exports = router;
