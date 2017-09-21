const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  institution: {
<<<<<<< HEAD
    type: String,
=======
    type: String, 
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
    required: true 
  }, 
  year: {
    type: Date 
  }, 
  address: {
<<<<<<< HEAD
    street: String, 
    city: String,
    state: String,
    zip: Number
=======
    country: String, 
    city: String,
    state: String 
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
  }, 
  degree: {
    type: String,
    enum: ['High School Diploma', 'GED', 'Undergraduate degree', 'Graduate degree']
  },
  testScores: {
    SAT: {
      reading: Number,
      math: Number,
<<<<<<< HEAD
      writing: Number
=======
      writing: Number,
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
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
<<<<<<< HEAD
  }  
});

module.exports = mongoose.model('Edu', schema);
=======
  },
  _id: false 
});

module.exports = schema;
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
