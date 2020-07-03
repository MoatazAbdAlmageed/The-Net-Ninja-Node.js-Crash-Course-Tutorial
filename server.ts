const express = require("express");
const ejs = require("ejs");
const app = express();
const tasks = [
  {
    title: "Resala Charity Organization",
    content: "Task details here 1",
    tasks: ["Create github organization"],
  },
  { title: "Task 2", content: "Task details here 2", tasks: [] },
  { title: "Task 3", content: "Task details here 3", tasks: [] },
  { title: "Task 4", content: "Task details here 4" },
];
app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  res.render("index", { title: "Tasks", tasks });
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
  console.log(req);
  console.log("----------------------------------------------------");
  console.log();
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});
