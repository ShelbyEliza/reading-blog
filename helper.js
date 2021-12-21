const fs = require("fs");
const { Blog, BlogList } = require("./modules/blog");
const { Author, AuthorList } = require("./modules/author");
const { v4: uuidv4 } = require("uuid");

const blogs = new BlogList();
const authors = new AuthorList();

// Universal Functions:

/**
 * reads file data,
 * parses data to an object
 * @param {string} file
 * @param {string} message identifies what is being read
 * @returns {promise} reject: error msg || resolve: objectOfArrays data
 */
const readData = (file, message) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(console.log(err));
      } else {
        console.log(`Reading: ${message}`);
        resolve(JSON.parse(data));
      }
    });
  });
};

/**
 * takes an array of objects and a file,
 * converts object data to json,
 * writes data to the file
 * @param {object} objectOfArrays - object containing array data
 * @param {string} file - to be read
 * @returns {promise} reject: error msg || resolve: success msg
 */
const writeEntry = (objectOfArrays, file, message) => {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(objectOfArrays, null, 4);
    fs.writeFile(file, jsonString, (err) => {
      if (err) {
        reject("ERROR writing to files");
      } else {
        resolve(`Writing: ${message}`);
      }
    });
  });
};

/**
 * creates a siteData object,
 * reads data from all json files,
 * saves that data to the specified siteData property
 * @returns {object} siteData
 */
const startup = new Promise((resolve) => {
  const siteData = {
    blogsDataObject: {},
    authorsDataObject: {},
  };
  console.log("Success -  All Purpose Startup");
  resolve(
    readData("data/blog-data.json", "blog-data")
      .then((blogsDataObject) => {
        siteData.blogsDataObject = blogsDataObject;
        return siteData;
      })
      .then((siteData) => readData("data/author-data.json", "author-data"))
      .then((authorsDataObject) => {
        siteData.authorsDataObject = authorsDataObject;
        return siteData;
      })
  );
});

/**
 * creates blog entry with a unique id,
 * if author already exists, author object's booksWritten property is updated,
 * else, a new author object is generated,
 * writes updated blog & author data to json files
 * @param {object} createdBlogObject
 * @param {object} siteData - object with a blogDataObject & an authorDataObject property
 */
const buildNewPost = (createdBlogObject, siteData) => {
  console.log("Creating new post");
  const uuidBlog = uuidv4();
  const uuidAuthor = uuidv4();
  const authorsArray = siteData.authorsDataObject.authors;
  const blogsArray = siteData.blogsDataObject.blogs;

  let blogData = blogs.createEntry(createdBlogObject);
  blogData.id = uuidBlog;

  for (var i = 0; i < authorsArray.length; i++) {
    if (authorsArray[i].name === blogData.author) {
      blogData.authorID = authorsArray[i].authorID;
      authorsArray[i].booksWritten.push(blogData.bookTitle);
      break;
    }
  }
  if (blogData.authorID === undefined) {
    blogData.authorID = uuidAuthor;
    let authorData = new Author(blogData.author, uuidAuthor, [], "");
    authorData.booksWritten.push(blogData.bookTitle);
    authorsArray.unshift(authorData);
  }

  blogsArray.unshift(blogData);

  writeEntry(siteData.blogsDataObject, "data/blog-data.json", "blog-data").then(
    (writenBlogs) =>
      writeEntry(
        siteData.authorsDataObject,
        "data/author-data.json",
        "author-data"
      )
  );
};

/**
 * searches an array for an entry matching an object with a particular property type
 * @param {object} previousData
 * @param {array} dataArray
 * @param {string} type
 * @returns
 */
const getPreviousPost = (previousData, dataArray, type) => {
  var previousItem;
  // console.log(previousData, dataArray, type);
  dataArray.forEach((element) => {
    if (element[type] === previousData[type]) {
      previousItem = element;
    }
  });
  return previousItem;
};

/**
 * deletes a post from the blogs data
 * &
 * removes bookTitle from booksWritten in authors data
 * @param {object} previousPost
 * @param {object} siteData
 */
const deleteBlog = (previousPost, siteData) => {
  console.log("Deleting Blog");
  const blogsDataArray = siteData.blogsDataObject.blogs;
  const authorsDataArray = siteData.authorsDataObject.authors;
  var indexOfAuthor;

  const authorOfDelete = authorsDataArray.filter((author) => {
    if (author.name === previousPost.author) {
      indexOfAuthor = authorsDataArray.indexOf(author);
      return author;
    }
  });

  const indexOfBook = authorOfDelete[0].booksWritten.indexOf(
    previousPost.bookTitle
  );
  authorOfDelete[0].booksWritten.splice(indexOfBook, 1);

  try {
    authorsDataArray.splice(indexOfAuthor, 1, authorOfDelete[0]);
  } catch (error) {
    console.error(error);
  }

  let indexOfPost = blogsDataArray.indexOf(previousPost);

  blogsDataArray.splice(indexOfPost, 1);

  siteData.authorsDataObject.authors = authorsDataArray;
  siteData.blogsDataObject.blogs = blogsDataArray;

  writeEntry(
    siteData.blogsDataObject,
    "data/blog-data.json",
    "Deleted Blog from blog-data"
  ).then((writtenData) => {
    writeEntry(
      siteData.authorsDataObject,
      "data/author-data.json",
      "Deleted Book from author-data"
    );
  });
};

/**
 * modifies blog and author data with new information.
 * counter discloses how many occurences previous author has in blogsDataArray.
 * if updated author equals any author in blogs data, its authorID is set to match.
 * @param {object} previousBlogObject - blog being updated.
 * @param {object} updatedBlogObject  - updated blog.
 * @param {object} siteData           - stored blog & author data
 */
const updateBlog = (previousBlogObject, updatedBlogObject, siteData) => {
  console.log("Updating Blog");
  const blogsDataArray = siteData.blogsDataObject.blogs;
  const authorsDataArray = siteData.authorsDataObject.authors;
  const uuidAuthor = uuidv4();
  const indexOfPreviousBlog = blogsDataArray.indexOf(previousBlogObject);
  var counter = 0;

  updatedBlogObject.id = previousBlogObject.id;
  const updatedBlog = blogs.createEntry(updatedBlogObject);

  if (previousBlogObject.bookTitle !== updatedBlog.bookTitle) {
    var titleModified = true;
  } else {
    var titleModified = false;
  }
  // not sure if following code in necessary.
  // leaving in in case function needs reworking again.
  if (previousBlogObject.author !== updatedBlog.author) {
    var authorModified = true;
  } else {
    var authorModified = false;
  }

  for (var i = 0; i < blogsDataArray.length; i++) {
    if (blogsDataArray[i].author === updatedBlog.author) {
      updatedBlog.authorID = blogsDataArray[i].authorID;
      var newAuthorCreated = false;
      break;
    } else {
      var newAuthorCreated = true;
    }
    if (blogsDataArray[i].author === previousBlogObject.author) {
      counter++;
    }
  }

  // update:
  // updated author does not equal any other authors in data,
  // author has been modified,
  // previousBlog author changed & did not write any other books,
  //
  if (
    updatedBlog.authorID === undefined &&
    previousBlogObject.author !== updatedBlog.author &&
    counter == 1
  ) {
    updatedBlog.authorID = previousBlogObject.authorID;
    newAuthorCreated = true;
  }

  if (updatedBlog.authorID === undefined) {
    updatedBlog.authorID = uuidAuthor;
    newAuthorCreated = true;
  }

  blogsDataArray.splice(indexOfPreviousBlog, 1, updatedBlog);

  console.log("Updating Author Data");

  // either bookTitle changes or author changes or both:

  for (var i = 0; i < authorsDataArray.length; i++) {
    let authorWrotePreviousBook = authorsDataArray[i].booksWritten.includes(
      previousBlogObject.bookTitle
    );

    // author in array is the author in the updatedBlog:
    if (authorsDataArray[i].name === updatedBlog.author) {
      // if author in array wrote the book originally & title changed:
      if (authorWrotePreviousBook === true && titleModified === true) {
        let indexOfChangedBook = authorsDataArray[i].booksWritten.indexOf(
          previousBlogObject.bookTitle
        );
        authorsDataArray[i].booksWritten.splice(
          indexOfChangedBook,
          1,
          updatedBlog.bookTitle
        );
        // if author in array did not write the book originally:
      }
      if (authorWrotePreviousBook === false) {
        authorsDataArray[i].booksWritten.push(updatedBlog.bookTitle);
      }
      // if author in array is not the updated Author:
      // if author in array originally wrote the book:
    } else if (authorWrotePreviousBook === true) {
      let indexOfChangedBook = authorsDataArray[i].booksWritten.indexOf(
        previousBlogObject.bookTitle
      );
      authorsDataArray[i].booksWritten.splice(indexOfChangedBook, 1);
    }
  }

  if (newAuthorCreated === true) {
    let generatedAuthor = new Author(
      updatedBlog.author,
      updatedBlog.authorID,
      [updatedBlog.bookTitle],
      ""
    );
    authorsDataArray.push(generatedAuthor);
  }

  siteData.authorsDataObject.authors = authorsDataArray;
  siteData.blogsDataObject.blogs = blogsDataArray;

  writeEntry(
    siteData.blogsDataObject,
    "data/blog-data.json",
    "updated blog-data"
  ).then((writtenData) => {
    writeEntry(
      siteData.authorsDataObject,
      "data/author-data.json",
      "updated author-data"
    );
  });
};

const modifyAuthor = (previousAuthor, updatedAuthor, siteData) => {
  console.log("Modifying Author");
  const authorsDataArray = siteData.authorsDataObject.authors;
  const indexOfPrevious = authorsDataArray.indexOf(previousAuthor);

  // console.log(previousAuthor, updatedAuthor);

  previousAuthor.aboutAuthor = updatedAuthor.aboutAuthor;
  authorsDataArray.splice(indexOfPrevious, 1, previousAuthor);

  // console.log(authorsDataArray);

  siteData.authorsDataObject.authors = authorsDataArray;

  writeEntry(
    siteData.authorsDataObject,
    "data/author-data.json",
    "updated author-data"
  );
};

module.exports = {
  startup,
  buildNewPost,
  getPreviousPost,
  deleteBlog,
  updateBlog,
  modifyAuthor,
};
