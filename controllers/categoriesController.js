const helper = require("../helper");

const loadAuthors = (req, res) => {
  helper.startup.then((siteData) => {
    res.render("categories/authors", {
      title: "All Authors",
      authors: siteData.allAuthorData.authors,
    });
  });
};

// BROKEN - no name property on author class!!!
const loadAuthorDetails = (req, res) => {
  helper.startup.then((siteData) => {
    siteData.allAuthorData.authors.forEach((author) => {
      const nameOfAuthor = req.params.name;
      if (author.name == nameOfAuthor) {
        const matchingAuthor = author;
        this.specifiedAuthor = matchingAuthor;
      }
    });
    const allBlogData = siteData.allBlogData.blogs;
    console.log(allBlogData);
    res.render("categories/authorDetails", {
      title: "Author Details",
      author: this.specifiedAuthor,
      blogs: allBlogData,
    });
  });
};

const loadEditAuthor = (req, res) => {
  helper.startup.then((siteData) => {
    const ID = req.params.id;
    siteData.allAuthorData.authors.forEach((author) => {
      if (author.id == ID) {
        const matchingAuthor = author;
        this.specifiedAuthor = matchingAuthor;
        return matchingAuthor;
      }
    });
    res.render("categories/editAuthor", {
      title: "Edit an Author",
      author: this.specifiedAuthor,
    });
  });
};

const updateAuthor = (req, res) => {
  helper.startup
    .then((siteData) => {
      const ID = req.params.id;
      helper.modifyAuthor(ID, req.body, siteData);
    })
    .then((results) => {
      res.redirect("/blogs");
    });
};

module.exports = {
  loadAuthors,
  loadAuthorDetails,
  loadEditAuthor,
  updateAuthor,
};
