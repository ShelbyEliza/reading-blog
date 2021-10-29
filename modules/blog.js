const fs = require("fs");
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
      resolve(objectsData);
    });
  }

  createMultipleEntriesPromise(objectsData) {
    return new Promise((resolve, reject) => {
      if (objectsData != undefined) {
        console.log("successful promise - createMulti");
        this.blogEntries.blogs = objectsData.blogs.map(this.createEntry);
        // console.log(this.blogEntries);
        resolve(this.blogEntries);
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
    return blog;
  }

  addBlogToEntries(blogObject) {
    this.blogEntries.blogs.push(blogObject);
  }

  convertObjectToJsonPromise(blogEntries) {
    // console.log(blogEntries);
    return new Promise((resolve) => {
      console.log("successful promise - convert obj to json");
      const jsonString = JSON.stringify(blogEntries);
      // console.log(jsonString);
      resolve(jsonString);
    });
  }

  writeEntry(jsonString) {
    fs.writeFile("data/test-data.json", jsonString, (err) => {
      if (err) {
        console.log("ERROR writing to files");
      } else {
        console.log("Done writing files");
      }
    });
  }
}

const blogs = new BlogList();

blogs
  .readDataPromise("data/blog-data.json")
  .then((data) => blogs.convertJsonToObjectPromise(data))
  .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
  .then((blogsEntries) => blogs.convertObjectToJsonPromise(blogsEntries))
  .then((jsonString) => blogs.writeEntry(jsonString));

console.log("done");

module.exports = (Blog, BlogList);
