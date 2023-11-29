const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const bookSchema = require('./models/book');
const authorSchema = require('./models/author');
const cors = require('cors');

// Apollo Server requires:
// 1. typeDefs: GraphQL type definitions
// 2. resolvers: How do we resolve queries / mutations

const MONGODB = 'mongodb+srv://davidchuang5:Andyir0ns@codesmithgradtest.akyjqlo.mongodb.net/';
// mongoose.connect('mongodb+srv://davidchuang5:Andyir0ns@codesmithgradtest.akyjqlo.mongodb.net/');
// mongoose.connection.once('open', () => {
//   console.log('Connected to database');
// });

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to mongodb first becasue Apollo server relies on this connection
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connection Successful');
    return server.listen({ port: 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

// const app = express();

// app.use(cors());

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

// app.listen(4000, () => {
//   console.log('listening on port 4000');
// });
