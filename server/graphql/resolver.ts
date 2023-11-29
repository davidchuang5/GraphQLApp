const Book = require('../models/book');

module.exports = {
  Query: {
    async book(_, { ID }) {
      return await Book.findById(ID);
    },

    async getBooks(_, {}) {
      return await Book.find();
    },
  },

  Mutation: {
    async addBook(_, { bookInput: { name, genre, author } }) {
      const newBook = new Book({
        name: name,
        genre: genre,
        author: author,
      });

      const res = await newBook.save(); // MongoDB saving
      console.log('res._doc', res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteBook(_, { ID }) {
      const wasDeleted = (await Book.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; // returns 1 if deleted, 0 if nothing
    },

    async editBook(_, { ID, bookInput: { name, genre, author } }) {
      const wasEdited = (
        await Book.updateOne({ _id: ID }, { name: name, genre: genre, author: author })
      ).modifiedCount;
      return wasEdited; // 1 if somethin was edited, 0 if nothing
    },
  },
};
