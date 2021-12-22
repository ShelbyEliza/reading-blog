const helper = require("../helper");
const tagList = [
  "Sci-fi",
  "Fantasy",
  "Informative",
  "Fiction",
  "Short Story",
  "Non-fiction",
  "Biography",
  "Classical",
  "Comedy",
  "Horror",
];

const loadAllAuthors = (req, res) => {
  helper.startup.then((siteData) => {
    res.render("categories/allAuthors", {
      title: "All Authors",
      authors: siteData.authorsDataObject.authors,
    });
  });
};

const loadAuthorDetails = (req, res) => {
  helper.startup.then((siteData) => {
    siteData.authorsDataObject.authors.forEach((author) => {
      const idOfAuthor = req.params.authorID;
      if (author.authorID == idOfAuthor) {
        const matchingAuthor = author;
        this.specifiedAuthor = matchingAuthor;
      }
    });
    const allBlogData = siteData.blogsDataObject.blogs;
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
    siteData.authorsDataObject.authors.forEach((author) => {
      if (author.authorID === ID) {
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
      const previousAuthor = helper.getPreviousPost(
        req.params,
        siteData.authorsDataObject.authors,
        "name"
      );
      console.log(req.params);
      helper.modifyAuthor(previousAuthor, req.body, siteData);
    })
    .then((results) => {
      res.redirect("/blogs");
    });
};

const loadAllTags = (req, res) => {
  res.render("categories/allTags", {
    title: "Tags List",
    tags: tagList,
  });
};

const loadTagDetails = (req, res) => {
  helper.startup.then((siteData) => {
    let blogsDataArray = siteData.blogsDataObject.blogs;
    let blogsWithTag = [];
    console.log(req.params.tag);
    blogsDataArray.forEach((blog) => {
      if (blog.tags.includes(req.params.tag)) {
        blogsWithTag.push(blog);
      }
    });
    console.log(blogsWithTag);

    res.render("categories/tagDetails", {
      title: req.params.tag,
      tags: tagList,
      blogsWithTag: blogsWithTag,
      authorsDataArray: siteData.authorsDataObject.authors,
      blogsDataArray: siteData.blogsDataObject.blogs,
    });
  });
};

module.exports = {
  loadAllAuthors,
  loadAuthorDetails,
  loadEditAuthor,
  updateAuthor,
  loadAllTags,
  loadTagDetails,
};
