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
    // const includesAuthorObj =
    //   this.authorDirectory.authors.includes(authorObject);

    // if (includesAuthorObj == false) {
    if (authorObject.id == undefined) {
      authorObject.id = uniqueID;
    }

    let { id, name, booksWritten, quotes, aboutAuthor } = authorObject;

    let author = new Author(id, name, booksWritten, quotes, aboutAuthor);
    return author;
    // }
  }

  createAuthorsArrayPromise(objectsData) {
    return new Promise((resolve, reject) => {
      if (objectsData != undefined) {
        const objArray = objectsData.blogs;
        const authorArray = [];

        objArray.forEach((element) => {
          const includesAuthor = authorArray.includes(element.author);

          if (includesAuthor == false) {
            authorArray.push(element.author);
          }
        });

        resolve(authorArray);
      } else {
        reject("Error.");
      }
    });
  }

  createMultipleAuthorsPromise(authorArray) {
    return new Promise((resolve, reject) => {
      if (authorArray != undefined) {
        const arrayOfAuthorObjects = [];

        authorArray.map((obj) => {
          let authorObj = {};
          authorObj["name"] = obj;
          arrayOfAuthorObjects.push(authorObj);
        });
        // console.log(arrayOfAuthorObjects);
        this.authorDirectory.authors = arrayOfAuthorObjects.map(
          this.createAuthor
        );
        // console.log(this.authorDirectory);
        resolve(this.authorDirectory);
      } else {
        reject("Error - createMultipleAuthorsPromise");
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
