const { v4: uuidv4 } = require("uuid");

class Author {
  constructor(name, booksWritten = [], quotes = [], aboutAuthor = "") {
    this.id = uuidv4();
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
    let { name, booksWritten, quotes, aboutAuthor } = authorObject;

    let author = new Author(name, booksWritten, quotes, aboutAuthor);
    return author;
  }

  createMultipleAuthorsPromise(authorObjArray) {
    return new Promise((resolve, reject) => {
      if (authorObjArray != undefined) {
        console.log("Success - Author List Created");
        this.authorDirectory.authors = authorObjArray.authors.map(
          this.createAuthor
        );
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

  checkIfAuthorExists(authorName, authorArray) {
    for (var i = 0; i < authorArray.length; i++) {
      if (authorArray[i].name == authorName) {
        console.log("Author already exists.");

        return true;
      }
    }
    return false;
  }
}

module.exports = {
  Author,
  AuthorList,
};
