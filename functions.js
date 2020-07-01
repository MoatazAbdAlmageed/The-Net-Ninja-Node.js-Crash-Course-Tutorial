const fs = require("fs");

const mkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      console.error(err);
    });
  } else {
    console.log("Directory Exists");
  }
};
const rmdir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmdir(dir, (err) => {
      console.error(err);
    });
  } else {
    console.log("Directory not found");
  }
};

module.exports = { mkdir, rmdir };
