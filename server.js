const express = require("express");
const app = express();
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const moment = require("moment");
const methodOverride = require("method-override");
const dotenv = require("dotenv").config();
const pagesRoutes = require("./routes/pages");
const taskRoutes = require("./routes/task");
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//form-urlencoded
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", (data) => {
  console.log("connected");
  app.listen(process.env.PORT);
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

app.use(pagesRoutes);
// Tasks
app.use(taskRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});
