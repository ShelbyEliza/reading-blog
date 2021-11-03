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
        // console.log(this.blogEntries.blogs);
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
    return blog;
  }

  // addBlogToEntriesPromise(blogObject) {
  //   return new Promise((resolve) => {
  //     console.log("successful promise - addBlogToEntries");
  //     this.blogEntries.blogs.push(blogObject);
  //     resolve(this.blogEntries);
  //   });
  // }

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
    fs.writeFile("data/blog-data.json", jsonString, (err) => {
      if (err) {
        console.log("ERROR writing to files");
      } else {
        console.log("Done writing files");
      }
    });
  }

  createNewPost() {
    return new Promise((resolve) => {});
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
  );
});

// const blog_index = (req, res) => {
//   Blog.find()
//     .sort()
//     .then((result) => {
//       res.render("blogs/index", { title: "All Blogs", blogs: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const blog_create_post = (req, res) => {
//   const blog = new Blog(req.body);
//   return blog
//     .then((blogData) => blogs.createEntry(blogData))
//     .then((newlyCreatedBlog) => blogs.addBlogToEntriesPromise(newlyCreatedBlog))
//     .then((result) => {
//       res.redirect("/");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// blogs
//   .readDataPromise("data/blog-data.json")
//   .then((data) => blogs.convertJsonToObjectPromise(data))
//   .then((objectsData) => blogs.createMultipleEntriesPromise(objectsData))
//   .then((blogsEntries) => blogs.convertObjectToJsonPromise(blogsEntries))
//   .then((jsonString) => blogs.writeEntry(jsonString));

module.exports = (Blog, BlogList, startupPromise);
