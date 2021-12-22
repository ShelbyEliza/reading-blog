const express = require("express");
const { render } = require("ejs");
const morgan = require("morgan");

const blogRoutes = require("./routes/blogRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("modules"));
app.use(express.static("tests"));

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

app.use("/blogs", blogRoutes);
app.use("/categories", categoriesRoutes);

app.listen(3000);
