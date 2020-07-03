const express = require("express");
const app = express();
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
const mongoose = require("mongoose");
const Task = require("./models/task");
const bodyParser = require("body-parser");
const moment = require("moment");
const methodOverride = require("method-override");

// for parsing application/json
// app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//form-urlencoded
mongoose.connect("mongodb://localhost/board", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (data) => {
  console.log("connected");
  app.listen(3000);
});

/**
 * Error: No default engine was specified and no extension was provided.
 */
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});
// app.use((req, res, next) => {
//   console.table({ method: req.method, path: req.path });
//   next();
// });
app.get("/", (req, res) => {
  tasks = Task.find()
    .sort({ createdAt: -1 })
    .then((tasks) => {
      res.render("index", { title: "Tasks", tasks });
    });
});
app.get("/show/:id", (req, res) => {
  tasks = Task.findById(`${req.params.id}`).then((task) => {
    res.render("show", { title: task.title, task });
  });
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
  const { title } = req.body;
  if (!title) {
    res.redirect("/");
  }
  const task = new Task({ title: title.trim(), status: false });
  task.save().then(() => {
    res.redirect("/");
  });
});
app.put("/update", (req, res) => {
  const { _id, title, status } = req.body;
  console.log(status);
  console.log(".......................");
  // todo set status
  Task.findByIdAndUpdate(
    { _id },
    { title: title.trim(), status: status == "on" ? true : false }
  ).then(() => {
    res.redirect("/");
  });
});
app.delete("/delete", (req, res) => {
  const { _id } = req.body;
  Task.findByIdAndDelete({ _id }).then(() => {
    res.redirect("/");
  });
});

app.use((req, res) => {
  res.render("404", { title: "404" });
});
