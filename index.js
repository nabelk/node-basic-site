const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

function getFileName(path) {
  switch (path) {
    case "/":
      return "index.html";
    case "/about":
      return "about.html";
    case "/contact":
      return "contact-me.html";
    default:
      return null;
  }
}

app.get(["/", "/about", "/contact"], (req, res) => {
  const filename = getFileName(req.originalUrl);
  if (filename) return res.sendFile(path.join(__dirname, "public", filename));

  return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(8080, () => console.log("Server running...."));
