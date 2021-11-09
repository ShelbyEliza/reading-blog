const blogModules = require("../modules/blog");

const loadHomepage = (req, res) => {
  blogModules.startupPromise.then((allBlogEntries) => {
    res.render("blogs/index", {
      title: "Reading Blog",
      blogs: allBlogEntries,
    });
  });
};

const loadCreatePage = (req, res) => {
  res.render("blogs/create", { title: "Create a New Blog" });
};

const loadDetailsPage = (req, res) => {
  blogModules.startupPromise.then((allBlogEntries) => {
    allBlogEntries.forEach((blog) => {
      const ID = req.params.id;
      if (blog.id == ID) {
        const matchingBlog = blog;
        this.specifiedBlog = matchingBlog;
        return matchingBlog;
      }
    });
    res.render("blogs/details", {
      title: "Blog Details",
      blog: this.specifiedBlog,
    });
  });
};

const createNewPost = (req, res) => {
  blogModules.createNewPost(req.body);
  res.redirect("/blogs");
};

const deleteBlog = (req, res) => {
  blogModules.startupPromise
    .then((allBlogEntries) => {
      const ID = req.params.id;
      blogModules.deletePost(allBlogEntries, ID);
    })
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  loadHomepage,
  loadCreatePage,
  loadDetailsPage,
  createNewPost,
  deleteBlog,
};
