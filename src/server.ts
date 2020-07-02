const fs = require("fs");
const http = require("http");
const url = require("url");
const { mkdir, rmdir, rm, touch, read, write } = require("../utils/functions");
const server = http.createServer((req, res) => {
  var q = url.parse(req.url, true).query;
  console.log("🚀🚀🚀🚀🚀 req.url");
  console.log(req.url);
  console.log("🚀🚀🚀🚀 req.method ");
  console.log(req.method);
  console.log("🚀🚀🚀🚀🚀🚀 q");
  console.log(q);
  console.log();
  /**
   * JSON
   */
  // res.writeHead(200, { "Content-Type": "application/json" });

  // console.log("🚀🚀🚀🚀🚀🚀 q");
  // console.log(JSON.stringify(q));
  // console.log();
  // console.log();
  // console.log();
  // res.write(JSON.stringify(q)); //write a response to the client

  /**
   * HTML
   */
  res.writeHead(200, { "Content-Type": "text/html" });

  const page = req.url == "/" ? "index" : req.url;

  const file = `./views/${page}.html`;
  read(file, (data) => {
    res.write(data);
    res.end(); //end the response
  });
});
const PORT = 3000;
server.listen(PORT, "localhost", () => {
  /**
   * http://localhost:3000/?name=moataz&age=30&country=Egypt
   */
  console.log(`the server object listens on port ${PORT}`);
});
