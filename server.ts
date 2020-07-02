const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  // res.sendFile(`views/index.html`, { root: __dirname });
  res.render("index");
});
app.get("/about", (req, res) => {
  // res.sendFile(`views/about.html`, { root: __dirname });
  res.render("about");
});
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  // res.sendFile(`views/404.html`, { root: __dirname });
  res.render("404");
});
