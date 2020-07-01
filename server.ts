const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  var q = url.parse(req.url, true).query;
  console.log(q);
  res.write(JSON.stringify(q)); //write a response to the client
  res.end(); //end the response
});
const PORT = 3000;
server.listen(PORT, "localhost", () => {
  /**
   * http://localhost:3000/?name=moataz&age=30
   */
  console.log(`the server object listens on port ${PORT}`);
});

module.exports = {
  server,
};
