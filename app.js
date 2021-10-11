const express = require("express");
const { render } = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { title: "Reading Blog" });
});

app.get("/new-blog", (req, res) => {
  res.render("new-blog", { title: "New Blog" });
});

app.get("/view-blog", (req, res) => {
  res.render("view-blog", { title: "View Blog" });
});

app.get("/search", (req, res) => {
  res.render("search", { title: "Search for a Post" });
});

app.get("/view-quote", (req, res) => {
  res.render("view-quote", { title: "View Quote" });
});

app.listen(3000);
