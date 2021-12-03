const fs = require("fs");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");

class Blog {
  constructor(id, bookTitle, author, authorID, blogContent) {
    this.id = id;
    this.bookTitle = bookTitle;
    this.author = author;
    this.authorID = authorID;
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
    let { id, bookTitle, author, authorID, blogContent } = blogObject;

    let blog = new Blog(id, bookTitle, author, authorID, blogContent);
    return blog;
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
