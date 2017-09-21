const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  about: {type: String, text: true},
  awards: {type: String, text: true} // QUESTION: this may need to be a list
});

module.exports = schema;
