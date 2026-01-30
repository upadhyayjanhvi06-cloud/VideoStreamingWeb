const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const multer = require("multer");

let creators = [
  { name: "admin", subscribers: 0 }
];


const storage = multer.diskStorage({
  destination: "public/videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// fake database
let videos = [
  { id: 1, title: "My First Video", filename: "sample.mp4", likes: 0 },
  { id: 2, title: "Learning Node.js", filename: "sample2.mp4", likes: 0 }
];


// HOME PAGE
app.get("/", (req, res) => {
  res.render("index", { videos });
});


// WATCH PAGE
app.get("/watch/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  res.render("watch", { video });
});


// UPLOAD PAGE
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "upload.ejs"));
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.post("/like/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  video.likes++;
  res.redirect("/watch/" + video.id);
});


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("video"), (req, res) => {
  videos.push({
    id: videos.length + 1,
    title: req.body.title,
    filename: req.file.filename,
    likes: 0
  });

  res.redirect("/");
});

app.post("/comment/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  video.comments.push(req.body.comment);
  res.redirect("/watch/" + video.id);
});

app.post("/subscribe/:creator", (req, res) => {
  const creator = creators.find(c => c.name === req.params.creator);
  creator.subscribers++;
  res.redirect("back");
});
