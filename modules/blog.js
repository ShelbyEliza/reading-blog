const fs = require("fs");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");
// const authorModules = require("./author");

class Blog {
  constructor(
    id,
    bookTitle,
    author,
    startDate,
    endDate,
    rating,
    tags,
    blogContent
  ) {
    this.id = id;
    this.bookTitle = bookTitle;
    this.author = author;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rating = rating;
    this.tags = tags;
    this.blogContent = blogContent;
  }
}

class BlogList {
  constructor() {
    this.blogEntries = {
      blogs: [],
    };
  }

  createEntry(blogObject) {
    let uniqueID = uuidv4();
    if (blogObject.id == undefined) {
      blogObject.id = uniqueID;
    }

    let {
      id,
      bookTitle,
      author,
      startDate,
      endDate,
      rating,
      tags,
      blogContent,
    } = blogObject;

    let blog = new Blog(
      id,
      bookTitle,
      author,
      startDate,
      endDate,
      rating,
      tags,
      blogContent
    );
    return blog;
  }

  createMultipleEntriesPromise(blogObjArray) {
    return new Promise((resolve, reject) => {
      if (blogObjArray != undefined) {
        console.log("Success - createMultipleEntriesPromise.");
        // console.log(blogObjArray);
        this.blogEntries.blogs = blogObjArray.blogs.map(this.createEntry);
        // console.log(this.blogEntries.blogs);
        resolve(this.blogEntries.blogs);
        // returns array of objects in the blogList
      } else {
        reject("Error.");
      }
    });
  }

  addToEntries(blogObject) {
    console.log("Success - addToEntries.");
    this.blogEntries.blogs.unshift(blogObject);
    return this.blogEntries;
  }

  updateAfterModifying(updatedBlogObjArray) {
    this.blogEntries.blogs = updatedBlogObjArray;
    return this.blogEntries;
  }
}

// const blogs = new BlogList();
// const authors = new authorModules.AuthorList();

// const readDataPromise = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) {
//         reject(console.log(err));
//       } else {
//         console.log("Success - readDataPromise.");
//         resolve(data);
//       }
//     });
//   });
// };

// const convertJsonToObjectPromise = (jsonData) => {
//   return new Promise((resolve) => {
//     console.log("Success - convertJsonToObjectPromise.");
//     const objectsData = JSON.parse(jsonData);
//     resolve(objectsData);
//   });
// };

// const convertObjectToJson = (blogObjArray) => {
//   console.log("Success - convertObjectToJson.");
//   const jsonString = JSON.stringify(blogObjArray, null, 4);
//   return jsonString;
// };

// const writeEntry = (jsonString) => {
//   return new Promise((resolve) => {
//     fs.writeFile("data/blog-data.json", jsonString, (err) => {
//       if (err) {
//         console.log("ERROR writing to files");
//       } else {
//         resolve("Done writing files");
//       }
//     });
//   });
// };

// const reverseOrder = (blogObjArray) => {
//   const lastBlog = blogObjArray.length - 1;

//   if (blogObjArray[lastBlog].id == 1) {
//     var reversedResults = blogObjArray;
//   } else {
//     reversedResults = blogObjArray.reverse();
//   }
//   return reversedResults;
// };

// const startupPromise = new Promise((resolve) => {
//   console.log("Success - startupPromise.");
//   resolve(
//     readDataPromise("data/blog-data.json")
//       .then((data) => convertJsonToObjectPromise(data))
//       .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
//       .then((allEntriesArray) => reverseOrder(allEntriesArray))
//   );
// });

// const createNewBlog = (createdBlogObject) => {
//   console.log("Creating new post");

//   const allBlogEntries = blogs.addToEntries(
//     blogs.createEntry(createdBlogObject)
//   );
//   const jsonString = convertObjectToJson(allBlogEntries);
//   writeEntry(jsonString).then((writenEntries) => {
//     console.log("successfully written to json file");
//   });
// };

// const deleteBlog = (blogObjArray, ID) => {
//   blogObjArray.forEach((blog) => {
//     if (blog.id == ID) {
//       this.blogToDelete = blog;
//     }
//   });
//   const indexOfBlog = blogObjArray.indexOf(this.blogToDelete);

//   if (indexOfBlog > -1) {
//     blogObjArray.splice(indexOfBlog, 1);
//     const updatedArray = blogs.updateAfterModifying(blogObjArray);
//     const updatedJsonString = convertObjectToJson(updatedArray);

//     writeEntry(updatedJsonString);
//   } else {
//     console.log("Error.");
//   }
// };

// const updateBlog = (ID, updatedBlogObject, blogObjArray) => {
//   console.log("Updating post");

//   blogObjArray.forEach((blog) => {
//     if (ID == blog.id) {
//       console.log("blog found");

//       updatedBlogObject.id = blog.id;
//       const updatedBlog = blogs.createEntry(updatedBlogObject);
//       const blogToReplaceId = blogObjArray.indexOf(blog);
//       blogObjArray.splice(blogToReplaceId, 1, updatedBlog);
//     }
//   });

//   writeEntry(convertObjectToJson(blogs.updateAfterModifying(blogObjArray)));
// };

module.exports = {
  Blog,
  BlogList,
  // startupPromise,
  // createNewBlog,
  // deleteBlog,
  // updateBlog,
};
