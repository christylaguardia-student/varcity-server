const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  about: String,
  awards: String // QUESTION: this may need to be a list
});

module.exports = schema;