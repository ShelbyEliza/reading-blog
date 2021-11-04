const blogModules = require("../modules/blog");

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
  blogModules.startupPromise.then((entriesArray) => {
    entriesArray.forEach((blog) => {
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

// const deleteBlog = (req, res) => {
//   const id = req.params.id;

//   Blog.findByIdAndDelete(id)
//     .then((result) => {
//       res.json({ redirect: "/blogs" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const createNewPost = (req, res) => {
  blogModules.createNewPost(req.body);
  res.redirect("/blogs");
};

module.exports = {
  loadHomepage,
  loadCreatePage,
  loadDetailsPage,
  createNewPost,
  // deleteBlog
};
