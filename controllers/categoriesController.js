const authorModules = require("../modules/author");
const blogModules = require("../modules/blog");
const helper = require("../helper");

const loadAuthors = (req, res) => {
  helper.authorStartupPromise.then((allBlogEntries) => {
    res.render("categories/authors", {
      title: "All Authors",
      // blogs: allBlogEntries,
    });
  });
};

module.exports = {
  loadAuthors,
};
