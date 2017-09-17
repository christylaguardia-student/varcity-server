const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  description: {
    type: String,
    required: true
  },
  videoUrl: String,
  imgUrl: {
    data: Buffer,
    type: mongoose.Schema.Types.Buffer
  }
});
