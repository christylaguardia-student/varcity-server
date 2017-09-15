const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  about: String,
  awards: String // QUESTION: this need to be a list
});

module.exports = mongoose.model('Bio', schema);
