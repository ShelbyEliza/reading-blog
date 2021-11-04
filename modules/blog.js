const fs = require("fs");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");

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

  readDataPromise(file) {
    return new Promise((resolve) => {
      fs.readFile(file, (err, data) => {
        console.log("successful promise - read");
        resolve(data);
      });
    });
  }

  convertJsonToObjectPromise(data) {
    return new Promise((resolve) => {
      console.log("successful promise - convert json to obj");
      const objectsData = JSON.parse(data);
      // console.log(objectsData);
      resolve(objectsData);
    });
  }

  createMultipleEntriesPromise(objectsData) {
    return new Promise((resolve, reject) => {
      if (objectsData != undefined) {
        console.log("successful promise - createMulti");
        this.blogEntries.blogs = objectsData.blogs.map(this.createEntry);
        resolve(this.blogEntries.blogs);
      } else {
        reject("Error!!");
      }
    });
  }

  createEntry(blogData) {
    let uniqueID = uuidv4();
    if (blogData.id == undefined) {
      blogData.id = uniqueID;
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
    } = blogData;

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
    // console.log(blog);
    return blog;
  }

  addToEntries(blogObject) {
    console.log("successful - addToEntries");
    this.blogEntries.blogs.push(blogObject);
    return this.blogEntries;
  }

  convertObjectToJson(blogEntries) {
    console.log("successful - convertObjectToJson");
    const jsonString = JSON.stringify(blogEntries);
    // console.log(jsonString);
    return jsonString;
  }

  writeEntry(jsonString) {
    return new Promise((resolve) => {
      fs.writeFile("data/blog-data.json", jsonString, (err) => {
        if (err) {
          console.log("ERROR writing to files");
        } else {
          resolve("Done writing files");
        }
      });
    });
  }
}

const blogs = new BlogList();

const startupPromise = new Promise((resolve) => {
  console.log("successful promise - startup");
  resolve(
    blogs
      .readDataPromise("data/blog-data.json")
      .then((data) => blogs.convertJsonToObjectPromise(data))
      .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
      .then((allEntriesArray) => reverseOrder(allEntriesArray))
  );
});

const createNewPost = (createdData) => {
  console.log("Creating new post");

  const allBlogEntries = blogs.addToEntries(blogs.createEntry(createdData));
  const jsonString = blogs.convertObjectToJson(allBlogEntries);
  blogs.writeEntry(jsonString).then((writenEntries) => {
    console.log("successfully written to json file");
  });
};

const reverseOrder = (array) => {
  const ascendingResults = array;
  const descendingResults = ascendingResults.reverse();
  return descendingResults;
};

module.exports = { Blog, BlogList, startupPromise, createNewPost };
