const fs = require("fs");

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

class Blogs {
  constructor() {
    this.blogEntries = [];
  }

  readData() {
    fs.readFile("data/blog-data.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const blogsData = JSON.parse(data);
      this.blogEntries = blogsData.blogs.map(this.createEntry);
      console.log(this.blogEntries);
    });
  }
  createEntry(blogData) {
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
}

module.exports = (Blog, Blogs);
