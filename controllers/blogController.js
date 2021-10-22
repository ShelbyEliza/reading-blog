const Blog = require("../modules/blog");

// blog_index (gets all blogs and injects them into index view),
// blog_details (get single blog),
// blog_create_get (send back the actual form),
// blog_create_post (create a new blog),
// blog_delete (delete blog)

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
};
