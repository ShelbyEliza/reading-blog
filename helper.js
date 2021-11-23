const fs = require("fs");
const { resolve } = require("path");
const { Blog, BlogList } = require("./modules/blog");
const { Author, AuthorList } = require("./modules/author");

const blogs = new BlogList();
const authors = new AuthorList();

const dataArray = new Object();
// Universal Functions:

const readDataPromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(console.log(err));
      } else {
        console.log("Success - Data Read");
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeEntry = (blogObjArray, file) => {
  return new Promise((resolve) => {
    const jsonString = JSON.stringify(blogObjArray, null, 4);
    fs.writeFile(file, jsonString, (err) => {
      if (err) {
        console.log("ERROR writing to files");
      } else {
        resolve("Done writing files");
      }
    });
  });
};

const reverseOrder = (blogObjArray) => {
  const lastBlog = blogObjArray.length - 1;

  if (blogObjArray[lastBlog].id == 1) {
    var reversedResults = blogObjArray;
  } else {
    reversedResults = blogObjArray.reverse();
  }
  return reversedResults;
};

const startupPromise = new Promise((resolve) => {
  console.log("Success - Blogs Started Up");
  resolve(
    readDataPromise("data/blog-data.json")
      .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
      .then((allEntriesArray) => reverseOrder(allEntriesArray))
  );
});

const authorStartupPromise = new Promise((resolve) => {
  console.log("Success - Authors Started Up");
  resolve(
    readDataPromise("data/author-data.json").then((objectsData) =>
      authors.createMultipleAuthorsPromise(objectsData)
    )
  );
});

const allPurposeStartUp = new Promise((resolve) => {
  const promiseArray = [startupPromise, authorStartupPromise];
  const startupObj = {
    allBlogData: {},
    allAuthorData: {},
  };

  Promise.all(promiseArray).then((values) => {
    // const allBlogData = blogs.updateAfterModifying(values[0]);
    // const allAuthorData = authors.updateAfterModifyingAuthors(values[1]);
    startupObj.allBlogData = values[0];
    startupObj.allAuthorData = values[1];
    resolve(startupObj);
  });
});

// allPurposeStartUp();
//////////// End of Universal functions ////////////////////////////////////////////////////////////

const createNewBlog = (createdBlogObject) => {
  console.log("Creating new post");

  const allBlogEntries = blogs.addToEntries(
    blogs.createEntry(createdBlogObject)
  );

  writeEntry(allBlogEntries, "data/blog-data.json").then((writenBlogs) => {
    console.log("Success - writeEntry to Blogs");
  });
};

const createNewAuthor = (createdBlogObject) => {
  authorStartupPromise.then((authorArray) => {
    const authorName = createdBlogObject.author;
    const authorExists = authors.checkIfAuthorExists(authorName, authorArray);

    if (authorExists) {
      authorArray.forEach((author) => {
        if (author.name == authorName) {
          author.booksWritten.push(createdBlogObject.bookTitle);
        }
      });
    } else {
      const createdAuthor = new Author(createdBlogObject.author);
      createdAuthor.booksWritten.push(createdBlogObject.bookTitle);
      authors.addToDirectory(createdAuthor);
    }
    const authorObjs = authors.updateAfterModifyingAuthors(authorArray);
    writeEntry(authorObjs, "data/author-data.json").then((writenAuthors) => {
      console.log("Success - writeEntry to Authors");
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

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

module.exports = {
  startupPromise,
  authorStartupPromise,
  allPurposeStartUp,
  createNewBlog,
  createNewAuthor,
  deleteBlog,
  updateBlog,
};
