const path = require("path");
const fs = require("fs");
const { skills, user } = require("./src/data");
const { mkdir, rmdir, rm, touch, read, write } = require("./functions");
const dir = "./public/";
const file = "./public/data.txt";
const readFile = "./public/read.txt";
const writeFile = "./public/write.txt";
const directories = ["css", "js", "fonts"];

/**
 * Create folder
 */
// directories.forEach((item) => {
//   mkdir(dir + path.sep + item);
// });

/**
 * Remove folder
 */
// directories.forEach((item) => {
//   rmdir(dir + path.sep + item);
// });
// mkdir(dir);
// rmdir(dir);
// touch(file, skills);
// rm(file);

const readStream = fs.createReadStream(readFile, { encoding: "utf8" });
// readStream.on("data", (chunck) => {
//   console.log(chunck);
//   // console.log(chunck.toString());
// });
const writeStream = fs.createWriteStream(writeFile);
readStream.pipe(writeStream);
