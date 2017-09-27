const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { sports, sportsGenders } = require('../utils/sports');

const statsSchema = new Schema({
  abbr: {
    type: String,
    required: true
  }, 
  value: {
    type: Number,
    required: true
  }
});

const sportsSchema = new Schema({
  sport: {
    type: String,
    required: true,
    enum: sports,
    default: 'Basketball'
  },
  sportGender: {
    type: String,
    required: true,
    enum: sportsGenders,
    default: 'Men\'s'
  },
  organization: {
    type: String,
    required: true,
    default: ''
  },
  position: {
    type: String,
    required: true,
    default: ''
  },
  stats: [statsSchema],
  seasonStart: Date,
  seasonEnd: Date
});

module.exports = sportsSchema;
