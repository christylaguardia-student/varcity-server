const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  description: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['Image Link', 'Video Link']
  },
  videoUrl: String,
  imageUrl: String
},
{
  _id: false
});
