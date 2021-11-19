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

    if (authorObject.id == undefined) {
      authorObject.id = uniqueID;
    }

    let { id, name, booksWritten, quotes, aboutAuthor } = authorObject;

    let author = new Author(id, name, booksWritten, quotes, aboutAuthor);
    return author;
  }

  createMultipleAuthorsPromise(authorObjArray) {
    return new Promise((resolve, reject) => {
      console.log("Success - createMultipleAuthorsPromise.");
      if (authorObjArray != undefined) {
        this.authorDirectory.authors = authorObjArray.authors.map(
          this.createAuthor
        );
        console.log(this.authorDirectory.authors);
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

  checkIfAuthorExists(createdBlogObject, authorArray) {
    const createdAuthorObj = {
      name: createdBlogObject.author,
    };
    console.log(authorArray);
    console.log("createdAuthorObj:");
    console.log(createdAuthorObj);

    var results;

    for (var i = 0; i < authorArray.length; i++) {
      if (authorArray[i].name == createdAuthorObj.name) {
        // console.log(`authorArray[i].name:`);
        // console.log(authorArray[i].name);
        // console.log(`createdAuthorObj.name: `);
        // console.log(createdAuthorObj.name);
        console.log("Author already exists.");
        results = this.updateAfterModifyingAuthors(authorArray);
        return results;
      }
    }

    const created = this.createAuthor(createdAuthorObj);
    console.log(`created: `);
    console.log(created);
    results = this.addToDirectory(created);

    console.log(`results:`);
    console.log(results);
    return results;
  }
}

module.exports = {
  Author,
  AuthorList,
};
