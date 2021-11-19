const fs = require("fs");
const { resolve } = require("path");
const blogModules = require("./modules/blog");
const authorModules = require("./modules/author");

const blogs = new blogModules.BlogList();
const authors = new authorModules.AuthorList();

// Universal Functions:

const readDataPromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(console.log(err));
      } else {
        console.log("Success - readDataPromise.");
        resolve(data);
      }
    });
  });
};

const convertJsonToObjectPromise = (jsonData) => {
  return new Promise((resolve) => {
    console.log("Success - convertJsonToObjectPromise.");
    const objectsData = JSON.parse(jsonData);
    // console.log(objectsData);
    resolve(objectsData);
  });
};

const convertObjectToJson = (blogObjArray) => {
  console.log("Success - convertObjectToJson.");
  const jsonString = JSON.stringify(blogObjArray, null, 4);
  return jsonString;
};

const writeEntry = (jsonString, file) => {
  return new Promise((resolve) => {
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
  // console.log(reversedResults);
  return reversedResults;
};

const startupPromise = new Promise((resolve) => {
  console.log("Success - startupPromise.");
  resolve(
    readDataPromise("data/blog-data.json")
      .then((data) => convertJsonToObjectPromise(data))
      .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
      .then((allEntriesArray) => reverseOrder(allEntriesArray))
  );
});

const authorStartupPromise = new Promise((resolve) => {
  resolve(
    readDataPromise("data/author-data.json")
      .then((data) => convertJsonToObjectPromise(data))
      .then((objectsData) => authors.createMultipleAuthorsPromise(objectsData))
  );
});

//////////// End of Universal functions ////////////////////////////////////////////////////////////

// const createNewBlog = (createdBlogObject) => {
//   console.log("Creating new post");

//   const allBlogEntries = blogs.addToEntries(
//     blogs.createEntry(createdBlogObject)
//   );

//   const authorAdded = authors.checkIfAuthorExists(createdBlogObject);

//   console.log(authorAdded);
//   const jsonStringAuthor = convertObjectToJson(authorAdded);
//   console.log(jsonStringAuthor);
//   writeEntry(jsonStringAuthor, "data/author-data.json").then(
//     (writtenAuthors) => {
//       console.log("Success - writeEnry to Authors");
//       const jsonStringBlog = convertObjectToJson(allBlogEntries);
//       writeEntry(jsonStringBlog, "data/blog-data.json").then((writenBlogs) => {
//         console.log("Success - writeEntry to Blogs");
//       });
//     }
//   );
// };

const createNewBlog = (createdBlogObject) => {
  console.log("Creating new post");

  const allBlogEntries = blogs.addToEntries(
    blogs.createEntry(createdBlogObject)
  );

  console.log("Success - writeEnry to Authors");
  const jsonStringBlog = convertObjectToJson(allBlogEntries);
  writeEntry(jsonStringBlog, "data/blog-data.json").then((writenBlogs) => {
    console.log("Success - writeEntry to Blogs");
  });
};

const createNewAuthor = (createdBlogObject) => {
  authorStartupPromise.then((authorArray) => {
    const authorAdded = authors.checkIfAuthorExists(
      createdBlogObject,
      authorArray
    );

    console.log(authorAdded);
    const jsonStringAuthor = convertObjectToJson(authorAdded);
    console.log(jsonStringAuthor);
    writeEntry(jsonStringAuthor, "data/author-data.json").then(
      (writenAuthors) => {
        console.log("Success - writeEntry to Authors");
      }
    );
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
    const updatedJsonString = convertObjectToJson(updatedArray);

    writeEntry(updatedJsonString, "data/blog-data.json");
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

  writeEntry(
    convertObjectToJson(blogs.updateAfterModifying(blogObjArray)),
    "data/blog-data.json"
  );
};

//////////////// End of blog functions //////////////////////////////

module.exports = {
  startupPromise,
  authorStartupPromise,
  createNewBlog,
  createNewAuthor,
  deleteBlog,
  updateBlog,
};
