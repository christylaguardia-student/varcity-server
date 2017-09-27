const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const searchable = require('mongoose-searchable');
const bcrypt = require('bcryptjs');
const infoSchema = require('./Info');
const eduSchema = require('./Edu');
const sportSchema = require('./Sport');
const mediaSchema = require('./Media');

const userSchema = new Schema({
  email: { type: String, required: true },
  hash: { type: String, required: true },
  info: infoSchema,
  edu: eduSchema,
  sports: [sportSchema],
  media: [mediaSchema]
});


userSchema.static('exists', function(query) {
  return this.find(query)
    .count()
    .then(count => {
      return count > 0;
    });
});

userSchema.method('generateHash', function(password) {
  return (this.hash = bcrypt.hashSync(password, 8));
});

userSchema.method('comparePassword', function(password) {
  return bcrypt.compare(password, this.hash);
});



module.exports = mongoose.model('User', userSchema);


