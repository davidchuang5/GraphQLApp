const graphql = require('graphql');
const _ = require('lodash');
const bookSchema = require('../models/book');
const authorSchema = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// const books = [
//   { name: 'Goosebumps', genre: 'Horror', id: '1', authorId: '1' },
//   { name: 'Magic Treehouse', genre: 'Adventure', id: '2', authorId: '2' },
//   { name: 'Harry Potter', genre: 'Sci-Fi', id: '3', authorId: '3' },
// ];

// const authors = [
//   { name: 'R.L. Stine', age: 78, id: '1' },
//   { name: 'Mary Pope Osborne', age: 72, id: '2' },
//   { name: 'J.K. Rowling', age: 56, id: '3' },
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return _.find(authors, { id: parent.authorId });
        return authorSchema.findById(parent.authorId);
      },
    },
  }),
});

AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorId: parent.id });
        return bookSchema.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db /other source
        // Nomarlly would be a function that matches the book in the array with the id but using lodash here

        //return _.find(books, { id: args.id });
        return bookSchema.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return authorSchema.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return bookSchema.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authorSchema.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new authorSchema({
          name: args.name,
          age: args.age,
        });
        // Saves the new entry to the database
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let book = new bookSchema({
          name: args.name,
          genre: args.genre,
          author: args.author,
        });
        // Saves the new entry to the database
        return book.save();
      },
    },
  },
});

// Specifies what the user can do when querying
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
