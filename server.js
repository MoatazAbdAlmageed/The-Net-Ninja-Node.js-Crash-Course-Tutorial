const express = require("express");
const app = express();
// const tasks = fs.readFileSync("./data/tasks.json", "utf8"); //todo get it from db
const morgan = require("morgan");
const bodyParser = require("body-parser");
const moment = require("moment");
const methodOverride = require("method-override");
require("dotenv").config();
const pagesRoutes = require("./routes/pages");
const taskRoutes = require("./routes/task");
const { connection } = require("./db");
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection(() => {
  app.listen(process.env.PORT);
});
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

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
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});
