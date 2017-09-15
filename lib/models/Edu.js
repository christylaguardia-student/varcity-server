const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  institution: {
    type: String 
  }, 
  year: {
    type: Date 
  }, 
  address: {
    street: String, 
    city: String,
    state: String,
    zip: Number
  }, 
  degree: {
    type: String,
    enum: ['High School Diploma', 'GED', 'Undergraduate degree', 'Graduate degree']
  },
  testScores: {
    SAT: {
      reading: Number,
      math: Number,
      writing: Number
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
  }  
});

module.exports = mongoose.model('Edu', schema);