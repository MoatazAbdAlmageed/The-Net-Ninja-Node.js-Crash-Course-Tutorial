const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.redirect("/tasks");
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
router.get("/services", (req, res) => {
  res.render("services", { title: "Services" });
});
router.get("/about-me", (req, res) => {
  res.redirect("/about");
});

module.exports = router;
