const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
  description: String,
  mediaType: {
    type: String,
    enum: ['Image Upload', 'Video Link']
  },
  videoUrl: String,
  img: Buffer
},
{
  _id: false
});
