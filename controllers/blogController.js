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

const loadEditPage = (req, res) => {
  blogModules.startupPromise.then((allBlogEntries) => {
    allBlogEntries.forEach((blog) => {
      const ID = req.params.id;
      if (blog.id == ID) {
        const matchingBlog = blog;
        this.specifiedBlog = matchingBlog;
        return matchingBlog;
      }
    });
    res.render("blogs/edit", {
      title: "Edit a Blog",
      blog: this.specifiedBlog,
      autoPopulate: blogModules.autoPopulate,
    });
  });
};

const createNewPost = (req, res) => {
  blogModules.createNewBlog(req.body);
  res.redirect("/blogs");
};

const deletePost = (req, res) => {
  blogModules.startupPromise
    .then((allBlogEntries) => {
      const ID = req.params.id;
      blogModules.deleteBlog(allBlogEntries, ID);
    })
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updatePost = (req, res) => {
  blogModules.startupPromise
    .then((allBlogEntries) => {
      const ID = req.params.id;
      blogModules.updateBlog(ID, req.body, allBlogEntries);
    })
    .then((results) => {
      res.redirect("/blogs");
    });
};

module.exports = {
  loadHomepage,
  loadCreatePage,
  loadDetailsPage,
  loadEditPage,
  createNewPost,
  deletePost,
  updatePost,
};
