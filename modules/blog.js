module.exports = class Blog {
  constructor(
    bookTitle,
    bookAuthor,
    blogDescription,
    startDate,
    endDate,
    newVocabularies,
    blogImages,
    bookQuotes,
    rating,
    tags,
    futureReads,
    blogContent
  ) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.blogDescription = blogDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.newVocabularies = newVocabularies;
    this.blogImages = blogImages;
    this.bookQuotes = bookQuotes;
    this.rating = rating;
    this.tags = tags;
    this.futureReads = futureReads;
    this.blogContent = blogContent;
  }
  toString() {
    return `${this.bookTitle} by ${this.bookAuthor}`;
  }
};
