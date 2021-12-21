class Blog {
  constructor(
    id,
    bookTitle,
    author,
    authorID,
    dateStarted,
    dateFinished,
    tags = [],
    blogContent
  ) {
    this.id = id;
    this.bookTitle = bookTitle;
    this.author = author;
    this.authorID = authorID;
    this.dateStarted = dateStarted;
    this.dateFinished = dateFinished;
    this.tags = tags;
    this.blogContent = blogContent;
  }
}

class BlogList {
  createEntry(blogObject) {
    let {
      id,
      bookTitle,
      author,
      authorID,
      dateStarted,
      dateFinished,
      tags,
      blogContent,
    } = blogObject;

    let blog = new Blog(
      id,
      bookTitle,
      author,
      authorID,
      dateStarted,
      dateFinished,
      tags,
      blogContent
    );
    return blog;
  }
}

module.exports = {
  Blog,
  BlogList,
};
