const blogModules = require("../modules/blog");

// blog_index (gets all blogs and injects them into index view),
// blog_details (get single blog),
// blog_create_get (send back the actual form),
// blog_create_post (create a new blog),
// blog_delete (delete blog)

const loadHomepage = (req, res) => {
  blogModules.startupPromise.then((results) => {
    res.render("blogs/index", {
      title: "Reading Blog",
      blogs: results,
    });
  });
};

const loadCreatePage = (req, res) => {
  res.render("blogs/create", { title: "Create a New Blog" });
};

const loadDetailsPage = (req, res) => {
  res.render("blogs/details", { title: "Blog Details" });
};

const createNewPost = (req, res) => {
  blogModules.createNewPost(req.body);
  res.redirect("/blogs");
};

module.exports = {
  loadHomepage,
  loadCreatePage,
  loadDetailsPage,
  createNewPost,
};
