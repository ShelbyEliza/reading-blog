const express = require("express");
const { render } = require("ejs");
const BlogList = require("./modules/blog");
const startup = require("./modules/blog");
const displayHomepageBlogs = require("./controllers/blogController");

// const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("modules"));

startup.then((results) => {
  console.log("app");
  console.log(results);
  console.log(results[0]);
  return results;
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  startup.then((results) =>
    res.render("blogs/index", {
      title: "Reading Blog",
      blogs: results,
    })
  );
});

app.get("/create", (req, res) => {
  res.render("blogs/create", { title: "New Blog" });
});

app.get("/details", (req, res) => {
  res.render("blogs/details", { title: "Blog Details" });
});

app.get("/search", (req, res) => {
  res.render("search", { title: "Search for a Post" });
});

app.get("/view-quote", (req, res) => {
  res.render("view-quote", { title: "View Quote" });
});

// app.use("/blogs", blogRoutes);

app.listen(3000);
