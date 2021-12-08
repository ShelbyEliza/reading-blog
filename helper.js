const fs = require("fs");
const { resolve } = require("path");
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
 * reverses an array's order
 * @param {array} arrayData
 * @returns {array} the given array in reversed order
 */
const reverseOrder = (arrayData) => {
  const lastBlog = arrayData.length - 1;
  if (arrayData[lastBlog].id == 1) {
    var reversedResults = arrayData;
  } else {
    reversedResults = arrayData.reverse();
  }
  return reversedResults;
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
    if (authorsArray[i].name == blogData.author) {
      blogData.authorID = authorsArray[i].authorID;
      authorsArray[i].booksWritten.push(blogData.bookTitle);
    } else {
      blogData.authorID = uuidAuthor;
      let authorData = new Author(blogData.author, uuidAuthor, [], "");
      authorData.booksWritten.push(blogData.bookTitle);
      authorsArray.push(authorData);
    }
    break;
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

////////////////////// STILL BROKEN BELOW /////////////////////////

const updateBlog = (previousBlogObject, updatedBlogObject, siteData) => {
  console.log("Updating post");
  const authorsDataObject = siteData.authorsDataObject.authors;
  const blogsDataObject = siteData.blogsDataObject.blogs;
  const uuidAuthor = uuidv4();
  const indexOfPreviousBlog = blogsDataObject.indexOf(previousBlogObject);
  const previousAuthorObject = authorsDataObject.find((authorObject) => {
    if (authorObject.authorID == previousBlogObject.authorID) {
      return authorObject;
    }
  });

  updatedBlogObject.id = previousBlogObject.id;
  const updatedBlog = blogs.createEntry(updatedBlogObject);

  blogsDataObject.forEach((blog) => {
    if (blog.author == updatedBlog.author) {
      updatedBlog.authorID = blog.authorID;
    }
  });

  // Author changes:
  if (updatedBlog.author !== previousBlogObject.author) {
    updatedBlog.authorID = uuidAuthor;
    var newAuthorObject = new Author(updatedBlog.author, uuidAuthor, [], "");
    newAuthorObject.booksWritten.push(updatedBlog.bookTitle);
    authorsDataObject.push(newAuthorObject);
    if (previousAuthorObject.booksWritten.length == 1) {
      const indexOfPreviousAuthor =
        authorsDataObject.indexOf(previousAuthorObject);
      authorsDataObject.splice(indexOfPreviousAuthor, 1);
    }
  } else {
    // Author does not change:
    updatedBlog.authorID = previousBlogObject.authorID;
  }

  // bookTitle changes:
  if (
    updatedBlog.bookTitle !== previousBlogObject.bookTitle ||
    previousAuthorObject.booksWritten.length != 1
  ) {
    previousAuthorObject.booksWritten.forEach((book) => {
      if (book == previousBlogObject.bookTitle) {
        let indexOfBook = previousAuthorObject.booksWritten.indexOf(book);
        // & author changes:
        if (updatedBlog.author !== previousBlogObject.author) {
          previousAuthorObject.booksWritten.splice(indexOfBook, 1);
        } else {
          previousAuthorObject.booksWritten.splice(
            indexOfBook,
            1,
            updatedBlog.bookTitle
          );
        }
        // console.log(indexOfBook);
      }
    });
  }

  blogsDataObject.splice(indexOfPreviousBlog, 1, updatedBlog);
  console.log(blogsDataObject);
  console.log(authorsDataObject);

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

const doesAuthorChange = () => {};

const deleteBlog = (blogObjArray, ID) => {
  blogObjArray.forEach((blog) => {
    if (blog.id == ID) {
      this.blogToDelete = blog;
    }
  });
  const indexOfBlog = blogObjArray.indexOf(this.blogToDelete);

  if (indexOfBlog > -1) {
    blogObjArray.splice(indexOfBlog, 1);
    const updatedArray = blogs.updateAfterModifying(blogObjArray);

    writeEntry(updatedArray, "data/blog-data.json");
  } else {
    console.log("Error.");
  }
};

// COULD BE BROKEN - check typeOf(siteData)
const modifyAuthor = (ID, updatedAuthorObject, siteData) => {
  console.log("Modifying Author");

  siteData.allAuthorData.forEach((author) => {
    if (ID == author.id) {
      console.log("Author Found");

      updatedAuthorObject.id = author.id;
      const updatedAuthor = authors.createAuthor(updatedAuthorObject);
      const authorToReplaceId = siteData.allAuthorData.indexOf(author);
      siteData.allAuthorData.splice(authorToReplaceId, 1, updatedAuthor);
    }
  });

  writeEntry(
    authors.updateAfterModifyingAuthors(siteData.allAuthorData),
    "data/author-data.json"
  );
};

module.exports = {
  startup,
  buildNewPost,
  deleteBlog,
  updateBlog,
  modifyAuthor,
};
