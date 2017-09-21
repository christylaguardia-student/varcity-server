const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  sport: {
    type: String, 
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  stat: {
    name: String,
    value: Number
  },
  seasonDates: {
    type: Date
  }
});

module.exports = schema;