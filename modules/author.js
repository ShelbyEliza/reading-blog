const { v4: uuidv4 } = require("uuid");

class Author {
  constructor(name, booksWritten = [], quotes = [], aboutAuthor = "", id) {
    this.name = name;
    this.booksWritten = booksWritten;
    this.quotes = quotes;
    this.aboutAuthor = aboutAuthor;
    this.id = id;
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
    if (authorObject.id == undefined) {
      authorObject.id = uniqueID;
    }

    let { name, booksWritten, quotes, aboutAuthor, id } = authorObject;

    let author = new Author(name, booksWritten, quotes, aboutAuthor, id);
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
