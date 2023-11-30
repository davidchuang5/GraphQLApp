const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

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
