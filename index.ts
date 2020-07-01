const fs = require("fs");
const os = require("os");
const { skills, user } = require("./src/data");
const { mkdir, rmdir } = require("./functions");

// console.log(">>>>>>>>>>>>>>>>> constants");
// console.log(__dirname);
// console.log(__filename);

// console.log(">>>>>>>>>>>>>>>>> Modules");
// console.log(skills);
// console.log(user);

// console.log(" >>>>>>>>>>>>>>>>> Built in");

// console.log(os);
// console.log(`os.platform()`);
// console.log(os.platform());
// console.log(`os.cpus()`);
// console.log(os.cpus());
// console.log(`os.userInfo()`);
// console.log(os.userInfo());
// console.log(`os.uptime()`);
// console.log(os.uptime());

console.log(" >>>>>>>>>>>>>>>>> fs");
const dir = "./public/data2";
mkdir(dir);
rmdir(dir);
