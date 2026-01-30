const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// fake database
let videos = [
  {
    id: 1,
    title: "My First Video",
    filename: "sample.mp4",
    likes: 0,
    uploader: "admin"
  },
  {
    id: 2,
    title: "Learning Node.js",
    filename: "sample2.mp4",
    likes: 0,
    uploader: "admin"
  }
];

// HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// WATCH PAGE
app.get("/watch/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "watch.html"));
});

// UPLOAD PAGE
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "upload.html"));
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
