const { model, Schema } = require('mongoose');
//const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  author: String,
});

module.exports = model('Book', bookSchema);
