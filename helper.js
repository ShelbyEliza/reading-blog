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

const writeEntry = (jsonString) => {
  return new Promise((resolve) => {
    fs.writeFile("data/blog-data.json", jsonString, (err) => {
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
    readDataPromise("data/blog-data.json")
      .then((data) => convertJsonToObjectPromise(data))
      .then((objectsData) => authors.createAuthorsArrayPromise(objectsData))
      .then((authorArray) => authors.createMultipleAuthorsPromise(authorArray))
  );
});

//////////// End of Universal functions ////////

const createNewBlog = (createdBlogObject) => {
  console.log("Creating new post");

  const allBlogEntries = blogs.addToEntries(
    blogs.createEntry(createdBlogObject)
  );
  const jsonString = convertObjectToJson(allBlogEntries);
  writeEntry(jsonString).then((writenEntries) => {
    console.log("successfully written to json file");
  });
};

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

    writeEntry(updatedJsonString);
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

  writeEntry(convertObjectToJson(blogs.updateAfterModifying(blogObjArray)));
};

///////////////////////////////// Authors ////////////////////////////////

// const writeAuthorsToJson = () => {
//   authorStartupPromise
//     .then((allAuthorObjs) => {
//       const json = convertObjectToJson(allAuthorObjs);

//     })
// }

//////////////// End of blog functions //////////////////////////////

module.exports = {
  startupPromise,
  authorStartupPromise,
  createNewBlog,
  deleteBlog,
  updateBlog,
};
