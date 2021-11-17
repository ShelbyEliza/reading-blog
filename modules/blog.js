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

module.exports = {
  Blog,
  BlogList,
};
