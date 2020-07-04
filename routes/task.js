const express = require("express");
const router = express.Router();
const {
  create,
  read,
  update,
  deleteItem,
} = require("../controllers/taskController");
router.get("/", read);
router.get("/completed", read);
router.post("/create", create);
router.put("/update", update);
router.delete("/delete/:id", deleteItem);
module.exports = router;
