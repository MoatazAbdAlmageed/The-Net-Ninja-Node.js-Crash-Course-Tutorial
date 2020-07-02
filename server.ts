const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  // res.sendFile(`views/index.html`, { root: __dirname });
  res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
  // res.sendFile(`views/about.html`, { root: __dirname });
  res.render("about", { title: "About" });
});
app.get("/services", (req, res) => {
  // res.sendFile(`views/services.html`, { root: __dirname });
  res.render("services", { title: "Services" });
});
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  // pass data to view
  res.render("create", { title: "Create Post" });
});
app.post("/create", (req, res) => {
  console.log("🚀🚀🚀🚀🚀🚀 req");
  console.log(req);
  console.log("----------------------------------------------------");
  console.log();
});

app.use((req, res) => {
  // res.sendFile(`views/404.html`, { root: __dirname });
  res.render("404", { title: "404" });
});
