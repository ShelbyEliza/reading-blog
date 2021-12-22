const helper = require("../helper");

const testFunction = () => {
  console.log("hello");
};

/**
 * loads index.ejs
 * receives all siteData from startup
 * provides blog data to index.ejs
 * @param {object} req
 * @param {object} res
 */
const loadHomepage = (req, res) => {
  helper.startup.then((siteData) => {
    res.render("blogs/index", {
      title: "Reading Blog",
      blogs: siteData.blogsDataObject.blogs,
    });
  });
};

const loadCreatePage = (req, res) => {
  res.render("blogs/create", { title: "Create a New Blog" });
};

const loadBlogDetails = (req, res) => {
  helper.startup.then((siteData) => {
    siteData.blogsDataObject.blogs.forEach((blog) => {
      const ID = req.params.id;
      if (blog.id == ID) {
        const matchingBlog = blog;
        this.specifiedBlog = matchingBlog;
        return matchingBlog;
      }
    });
    res.render("blogs/blogDetails", {
      title: "Blog Details",
      blog: this.specifiedBlog,
    });
  });
};

const loadEditPage = (req, res) => {
  helper.startup.then((siteData) => {
    siteData.blogsDataObject.blogs.forEach((blog) => {
      const ID = req.params.id;
      if (blog.id == ID) {
        const matchingBlog = blog;
        this.specifiedBlog = matchingBlog;
        return matchingBlog;
      }
    });
    res.render("blogs/editBlog", {
      title: "Edit a Blog",
      blog: this.specifiedBlog,
    });
  });
};

const createNewPost = (req, res) => {
  helper.startup.then((siteData) => {
    helper.buildNewPost(req.body, siteData);
    res.redirect("/blogs");
  });
};

const deletePost = (req, res) => {
  helper.startup
    .then((siteData) => {
      const previousPost = helper.getPreviousPost(
        req.params,
        siteData.blogsDataObject.blogs,
        "id"
      );
      helper.deleteBlog(previousPost, siteData);
    })
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updatePost = (req, res) => {
  helper.startup
    .then((siteData) => {
      const previousPost = helper.getPreviousPost(
        req.params,
        siteData.blogsDataObject.blogs,
        "id"
      );
      helper.updateBlog(previousPost, req.body, siteData);
    })
    .then((results) => {
      res.redirect("/blogs");
    });
};

module.exports = {
  loadHomepage,
  loadCreatePage,
  loadBlogDetails,
  loadEditPage,
  createNewPost,
  deletePost,
  updatePost,
};
