const authorModules = require("../modules/author");
const blogModules = require("../modules/blog");
const helper = require("../helper");

// const loadAuthors = (req, res) => {
//   helper.authorStartupPromise.then((allAuthorObjArray) => {
//     console.log(allAuthorObjArray);
//     res.render("categories/authors", {
//       title: "All Authors",
//       authors: allAuthorObjArray.authors,
//     });
//   });
// };

const loadAuthors = (req, res) => {
  helper.authorStartupPromise.then((allAuthorObjArray) => {
    res.render("categories/authors", {
      title: "All Authors",
      authors: allAuthorObjArray,
    });
  });
};

// const loadAnAuthors = (req, res) => {
//   helper.authorStartupPromise.then((allAuthorObjArray) => {
//     console.log(allAuthorObjArray);
//     res.render("categories/authors", {
//       title: "All Authors",
//       authors: allAuthorObjArray.authors,
//     });
//   });
// };

module.exports = {
  loadAuthors,
};
