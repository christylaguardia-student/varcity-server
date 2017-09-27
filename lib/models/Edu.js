const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema ({
  schools: [{
    institution: String,
    year: Number,
    address: {
      country: String,
      region: String,
      city: String
    },
    degree: String,
  }],
  testScores: {
    SAT: {
      reading: Number,
      math: Number,
      writing: Number,
    },
    ACT: {
      reading: Number,
      math: Number,
      writing: Number,
      science: Number
    },
    IB: {
      language: Number,
      math: Number,
      science: Number,
      history: Number
    }
  },
  _id: false
});

