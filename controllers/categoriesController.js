const categoriesModules = require("../modules/categories");
const blogModules = require("../modules/blog");

const loadAuthors = (req, res) => {
  blogModules.startupPromise.then((allBlogEntries) => {
    res.render("categories/authors", {
      title: "All Authors",
      blogs: allBlogEntries,
    });
  });
};

module.exports = {
  loadAuthors,
};
