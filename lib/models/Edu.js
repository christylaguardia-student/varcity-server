const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  institution: {
    type: String,
    required: true,
    text: true
  },
  year: {
    type: Number
  },
  address: {
    country: {type: String, text: true},
    city: {type: String, text: true},
    state: {type: String, text: true}
  },
  degree: {
    type: String,
    enum: ['High School Diploma', 'GED', 'Undergraduate degree', 'Graduate degree']
  },
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

module.exports = schema;