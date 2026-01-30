const express = require("express");
const path = require("path");

const app = express();

// allow static files (CSS)
app.use(express.static("public"));

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// watch page
app.get("/watch", (req, res) => {
  res.send("<h2>Watch Page (coming soon)</h2>");
});

// start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
