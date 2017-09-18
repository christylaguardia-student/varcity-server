const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const infoSchema = require('./Info');
const bioSchema = require('./Bio');
const mediaSchema = require('./Media');
const eduSchema = require('./Edu');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  info: [infoSchema],
  bio: [bioSchema],
  media: [mediaSchema],
  edu: [eduSchema]
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
  return bcrypt.compare(password, this.password);
});

module.exports = mongoose.model('User', userSchema);
