const express = require("express");
const { render } = require("ejs");
const morgan = require("morgan");
const blogModules = require("./modules/blog");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("modules"));

app.use(morgan("tiny"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/create", (req, res) => {
  res.redirect("/blogs");
});

app.get("/details", (req, res) => {
  res.redirect("/blogs");
});

app.get("/search", (req, res) => {
  res.render("search", { title: "Search for a Post" });
});

app.get("/view-quote", (req, res) => {
  res.render("view-quote", { title: "View Quote" });
});

app.use("/blogs", blogRoutes);

app.listen(3000);
