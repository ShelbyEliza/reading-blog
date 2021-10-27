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
    this.blogEntries = [];
  }

  readData() {
    fs.readFile("data/blog-data.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      try {
        const blogsData = JSON.parse(data);
        // console.log(blogsData);
        this.blogEntries = blogsData.blogs.map(this.createEntry);
        return this.blogEntries;
        // console.log(this.blogEntries);
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
    });
  }

  // populateEntries(blogsData) {}

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

  addBlogToBlogs(blogObject) {
    this.blogEntries.push(blogObject);
  }

  writeEntry() {
    const jsonString = JSON.stringify(this.blogEntries);
    fs.writeFile("data/blog-data.json", jsonString, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
}

module.exports = (Blog, BlogList);
