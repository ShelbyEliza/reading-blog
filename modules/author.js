const { v4: uuidv4 } = require("uuid");

class Author {
  constructor(name, authorID, booksWritten = [], aboutAuthor = "") {
    this.name = name;
    this.authorID = authorID;
    this.booksWritten = booksWritten;
    this.aboutAuthor = aboutAuthor;
  }
}

class AuthorList {
  constructor() {
    this.authorDirectory = {
      authors: [],
    };
  }

  createAuthor(createdAuthorObject) {
    let { name, authorID, booksWritten, aboutAuthor } = createdAuthorObject;

    let author = new Author(name, authorID, booksWritten, aboutAuthor);
    return author;
  }

  addToDirectory(authorObject) {
    console.log("Success - addToDirectory.");
    this.authorDirectory.authors.unshift(authorObject);
    return this.authorDirectory;
  }

  updateAfterModifyingAuthors(updatedAuthorObjArray) {
    this.authorDirectory.authors = updatedAuthorObjArray;
    return this.authorDirectory;
  }
}

module.exports = {
  Author,
  AuthorList,
};
