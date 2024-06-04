const http = require("http");
const fs = require("fs");
const path = require("path");

function getFileName(url) {
  switch (url) {
    case "/":
      return "index.html";
    case "/about":
      return "about.html";
    case "/contact":
      return "contact-me.html";
    default:
      return "404.html";
  }
}

http
  .createServer((req, res) => {
    const filename = getFileName(req.url);
    fs.readFile(path.join(__dirname, "public", filename), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    });
  })
  .listen(8080, () => console.log("Server running...."));
