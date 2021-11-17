const { v4: uuidv4 } = require("uuid");

class Author {
  constructor(id, name, booksWritten, quotes, aboutAuthor) {
    this.id = id;
    this.name = name;
    this.booksWritten = booksWritten;
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

  createAuthor(authorObject) {
    let uniqueID = uuidv4();

    if (this.authorDirectory.authors.includes(authorObject) == false) {
      if (authorObject.id == undefined) {
        authorObject.id = uniqueID;
      }

      let { id, name, booksWritten, quotes, aboutAuthor } = authorObject;

      let author = new Author(id, name, booksWritten, quotes, aboutAuthor);
      return author;
    }
  }

  createMultipleAuthorsPromise(objectsData) {
    return new Promise((resolve, reject) => {
      if (objectsData != undefined) {
        console.log("Success - createMultipleAuthorsPromise.");
        const objArrayData = objectsData.blogs;
        this.authorDirectory.authors = objArrayData.map(
          ({ author }) => this.createAuthor
        );
        console.log(this.authorDirectory);
        resolve(this.authorDirectory.authors);
      } else {
        reject("Error.");
      }
    });
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
