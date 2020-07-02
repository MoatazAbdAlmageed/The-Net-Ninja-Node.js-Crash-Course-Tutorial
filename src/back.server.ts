const http = require("http");
const url = require("url");
const { read } = require("../utils/functions");
const PORT = 3000;
const _ = require("lodash");

const greeting = _.once(() => {
  console.log("moataz");
  console.log("----------------------------------------------------");
  console.log();
});
const server = http.createServer((req, res) => {
  /**
   * JSON
   */
  // res.writeHead(200, { "Content-Type": "application/json" });
  // var q = url.parse(req.url, true).query;
  // console.log("🚀🚀🚀🚀🚀🚀 q");
  // console.log(JSON.stringify(q));
  // console.log();
  // console.log();
  // console.log();
  // res.write(JSON.stringify(q)); //write a response to the client

  /**
   * HTML
   */
  let statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let path = `./views/`;
  switch (req.url) {
    case "/":
    case "/home":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    case "/about-me":
      statusCode = 301;
      path += "about.html";
      res.setHeader("Location", "/about");
      break;
    case "/services":
      path += "services.html";
      break;
    default:
      statusCode = 404;
      path += "404.html";
      break;
  }
  read(path, (data) => {
    res.statusCode = statusCode;
    res.write(data);
    res.end(); //end the response
  });
});
server.listen(PORT, "localhost", () => {
  /**
   * http://localhost:3000/?name=moataz&age=30&country=Egypt
   */
  console.log(`🚀 the server object listens on port ${PORT}`);
});
