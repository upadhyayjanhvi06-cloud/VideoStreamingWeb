const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// fake creators
let creators = [
  { name: "admin", subscribers: 0 }
];

// fake database
let videos = [
  {
    id: 1,
    title: "My First Video",
    filename: "sample.mp4",
    likes: 0,
    comments: []
  },
  {
    id: 2,
    title: "Learning Node.js",
    filename: "sample2.mp4",
    likes: 0,
    comments: []
  }
];

// multer setup
const storage = multer.diskStorage({
  destination: "public/videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ================= ROUTES =================

// HOME
app.get("/", (req, res) => {
  res.render("index", { videos });
});

// WATCH
app.get("/watch/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  res.render("watch", { video });
});

// UPLOAD
app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("video"), (req, res) => {
  videos.push({
    id: videos.length + 1,
    title: req.body.title,
    filename: req.file.filename,
    likes: 0,
    comments: []
  });
  res.redirect("/");
});

// LIKE
app.post("/like/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  video.likes++;
  res.redirect("/watch/" + video.id);
});

// COMMENT
app.post("/comment/:id", (req, res) => {
  const video = videos.find(v => v.id == req.params.id);
  video.comments.push(req.body.comment);
  res.redirect("/watch/" + video.id);
});

// SUBSCRIBE
app.post("/subscribe/:creator", (req, res) => {
  const creator = creators.find(c => c.name === req.params.creator);
  creator.subscribers++;
  res.redirect("back");
});

// LOGIN (page only for now)
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// DASHBOARD (page only)
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// START SERVER (ALWAYS AT END)
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
