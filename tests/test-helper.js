// const helper = require("../helper");
// const blogController = require("../controllers/blogController");

// const updatedBlogData = {
//   id: "",
//   bookTitle: "A Song of Ice and Fire",
//   author: "George RR. Martin",
//   authorID: "5A",
//   blogContent: "",
// };

// const testStartup = new Promise((resolve) => {
//   const testData = {
//     blogsTestObj: {},
//     authorsTestObj: {},
//   };

//   console.log("Success -  Test Startup");

//   resolve(
//     readData("test/blog-data.json", "blog-data-test")
//       .then((blogsTestObj) => {
//         testData.blogsTestObj = blogsTestObj;
//         return testData;
//       })
//       .then((siteData) => readData("test/author-data.json", "author-data-test"))
//       .then((authorsTestObj) => {
//         testData.authorsTestObj = authorsTestObj;
//         return testData;
//       })
//   );
// });

// const updateTest = (previousBlogID, res) => {
//   testStartup.then((siteData) => {
//     const previousBlogObject = siteData.blogsTestObj.blogs.find((blog) => {
//       if (blog.id == previousBlogID) {
//         return blog;
//       }
//       console.log(previousBlogObject, updatedBlogData, siteData);
//     });
//     // updateBlogTest(previousBlogObject, updatedBlogData, siteData);
//   });
//   // .then((results) => {
//   //   res.redirect("/blogs");
//   // });
// };

// //////////////////////////////////////////////////////////////////////////////////////

// const updateBlogTest = (previousBlogObject, updatedBlogObject, siteData) => {
//   console.log("Updating post");
//   const authorsTestObj = siteData.authorsTestObj.authors;
//   const blogsTestObj = siteData.blogsTestObj.blogs;
//   const uuidAuthor = uuidv4();
//   const indexOfPreviousBlog = blogsTestObj.indexOf(previousBlogObject);
//   const previousAuthorObject = authorsTestObj.find((authorObject) => {
//     if (authorObject.authorID == previousBlogObject.authorID) {
//       return authorObject;
//     }
//   });

//   updatedBlogObject.id = previousBlogObject.id;
//   const updatedBlog = blogs.createEntry(updatedBlogObject);

//   blogsTestObj.forEach((blog) => {
//     if (blog.author == updatedBlog.author) {
//       updatedBlog.authorID = blog.authorID;
//     }
//   });

//   // Author changes:
//   if (updatedBlog.author !== previousBlogObject.author) {
//     updatedBlog.authorID = uuidAuthor;
//     var newAuthorObject = new Author(updatedBlog.author, uuidAuthor, [], "");
//     newAuthorObject.booksWritten.push(updatedBlog.bookTitle);
//     authorsTestObj.push(newAuthorObject);
//     if (previousAuthorObject.booksWritten.length == 1) {
//       const indexOfPreviousAuthor =
//         authorsTestObj.indexOf(previousAuthorObject);
//       authorsTestObj.splice(indexOfPreviousAuthor, 1);
//     }
//   } else {
//     // Author does not change:
//     updatedBlog.authorID = previousBlogObject.authorID;
//   }

//   // bookTitle changes:
//   if (
//     updatedBlog.bookTitle !== previousBlogObject.bookTitle ||
//     previousAuthorObject.booksWritten.length != 1
//   ) {
//     previousAuthorObject.booksWritten.forEach((book) => {
//       if (book == previousBlogObject.bookTitle) {
//         let indexOfBook = previousAuthorObject.booksWritten.indexOf(book);
//         // & author changes:
//         if (updatedBlog.author !== previousBlogObject.author) {
//           previousAuthorObject.booksWritten.splice(indexOfBook, 1);
//         } else {
//           previousAuthorObject.booksWritten.splice(
//             indexOfBook,
//             1,
//             updatedBlog.bookTitle
//           );
//         }
//         // console.log(indexOfBook);
//       }
//     });
//   }

//   blogsTestObj.splice(indexOfPreviousBlog, 1, updatedBlog);
//   console.log(blogsTestObj);
//   console.log(authorsTestObj);

//   writeEntry(
//     siteData.blogsTestObj,
//     "test/write-test-blogs.json",
//     "updated test blog-data"
//   ).then((writtenData) => {
//     writeEntry(
//       siteData.authorsTestObj,
//       "test/write-test-author.json",
//       "updated test author-data"
//     );
//   });
// };

// updateTest(updatedBlogData);
