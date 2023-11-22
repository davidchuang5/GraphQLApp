const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const bookSchema = require('./models/book');
const authorSchema = require('./models/author');
const cors = require('cors');

mongoose.connect('mongodb+srv://davidchuang5:Andyir0ns@codesmithgradtest.akyjqlo.mongodb.net/');
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('listening on port 4000');
});
