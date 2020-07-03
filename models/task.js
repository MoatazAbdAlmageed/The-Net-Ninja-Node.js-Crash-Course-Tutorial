const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tasks: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
