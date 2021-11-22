const authorModules = require("../modules/author");
const blogModules = require("../modules/blog");
const helper = require("../helper");

const loadAuthors = (req, res) => {
  helper.authorStartupPromise.then((allAuthorObjArray) => {
    res.render("categories/authors", {
      title: "All Authors",
      authors: allAuthorObjArray,
    });
  });
};

const loadAuthorDetails = (req, res) => {
  helper.authorStartupPromise.then((allAuthorsDirectory) => {
    allAuthorsDirectory.forEach((author) => {
      const nameOfAuthor = req.params.name;
      if (author.name == nameOfAuthor) {
        const matchingAuthor = author;
        this.specifiedAuthor = matchingAuthor;
        return matchingAuthor;
      }
    });
    res.render("categories/authorDetails", {
      title: "Author Details",
      author: this.specifiedAuthor,
    });
  });
};

module.exports = {
  loadAuthors,
  loadAuthorDetails,
};
