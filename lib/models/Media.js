const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// module.exports = new Schema({
const schema = new Schema({
  description: {
    type: String,
    required: true
  },
  videoUrl: String,
  imgUrl: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Media', schema);
