const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  description: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['image upload', 'video link'],
    required: true
  },
  videoUrl: String,
  img: Buffer
},
{
  _id: false
});
