class Author {
  constructor(name, authorID, booksWritten = [], aboutAuthor = "") {
    this.name = name;
    this.authorID = authorID;
    this.booksWritten = booksWritten;
    this.aboutAuthor = aboutAuthor;
  }
}

class AuthorList {
  createAuthor(createdAuthorObject) {
    let { name, authorID, booksWritten, aboutAuthor } = createdAuthorObject;

    let author = new Author(name, authorID, booksWritten, aboutAuthor);
    return author;
  }
}

module.exports = {
  Author,
  AuthorList,
};
