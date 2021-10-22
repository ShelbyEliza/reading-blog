const express = require("express");
const { render } = require("ejs");
const Blogs = require("./modules/blog");
// const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("data"));

// const blogs = [];
// blogs.push(new Blog("The Farthest Shore", "Ursula K. Le Guin", "2021"));
// blogs.push(new Blog("The Tombs of Atuan", "Ursula K. Le Guin", "2021"));
// blogs.push(new Blog("A Wizard of Earthsea", "Ursula K. Le Guin", "2021"));

const blogs = new Blogs();
blogs.readData();
console.log(blogs.blogEntries);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("blogs/index", { title: "Reading Blog" });
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
