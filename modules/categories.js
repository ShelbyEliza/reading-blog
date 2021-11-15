const fs = require("fs");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");

class Author {
  constructor(id, name, booksWritten, tags, quotes, aboutAuthor) {
    this.id = id;
    this.name = name;
    this.booksWritten = booksWritten;
    this.tags = tags;
    this.quotes = quotes;
    this.aboutAuthor = aboutAuthor;
  }
}

class AuthorList {
  constructor() {
    this.authorDirectory = {
      authors: [],
    };
  }
}

const authors = new AuthorList();

module.exports = {
  Author,
  AuthorList,
};
