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

const updateBlog = (ID, updatedBlogObject, blogObjArray) => {
  console.log("Updating post");

  blogObjArray.forEach((blog) => {
    if (ID == blog.id) {
      console.log("blog found");

      updatedBlogObject.id = blog.id;
      const updatedBlog = blogs.createEntry(updatedBlogObject);
      const blogToReplaceId = blogObjArray.indexOf(blog);
      blogObjArray.splice(blogToReplaceId, 1, updatedBlog);
    }
  });

  writeEntry(blogs.updateAfterModifying(blogObjArray), "data/blog-data.json");
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
