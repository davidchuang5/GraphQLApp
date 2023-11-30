const { gql, GraphQLID } = require('apollo-server');

const typeDefs = gql`
  type Book {
    name: String
    genre: String
    author: String
  }

  input BookInput {
    name: String
    genre: String
    author: String
  }

  type Query {
    book(ID: ID!): Book!
    getBooks: [Book]
  }
  type Mutation {
    addBook(bookInput: BookInput): Book!
    deleteBook(ID: ID!): Boolean
    editBook(ID: ID!, bookInput: BookInput): Boolean
  }
`;

module.exports = typeDefs;
