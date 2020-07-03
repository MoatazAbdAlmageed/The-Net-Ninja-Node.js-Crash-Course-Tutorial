const express = require("express");
const ejs = require("ejs");
const app = express();
const fs = require("fs");
const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
/**
 * Error: No default engine was specified and no extension was provided.
 */
app.set("view engine", "ejs");

app.listen(3000);
app.use(morgan("dev"));
app.use(express.static("public"));

// app.use((req, res, next) => {
//   console.table({ method: req.method, path: req.path });
//   next();
// });
app.get("/", (req, res) => {
  res.render("index", { title: "Tasks", tasks: JSON.parse(tasks) });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/services", (req, res) => {
  res.render("services", { title: "Services" });
});
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});
app.post("/create", (req, res) => {
  console.log("🚀🚀🚀🚀🚀🚀 req");
  console.log("---------------------- saving --------------------------");
  console.log();
  res.redirect("/");
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});
