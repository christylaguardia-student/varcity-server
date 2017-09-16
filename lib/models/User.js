const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const infoSchema = require('./Info');
const bioSchema = require('./Bio');
const mediaSchema = require('./Media');

const userSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  info: [infoSchema],
  bio: [bioSchema],
  media: [mediaSchema]
});

userSchema.methods.setPassword = function(pw) {
  this.password = bcrypt.hashSync(pw);
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.static('exists', function(query) {
  return this.find(query)
    .count()
    .then(count => count > 0);
});

module.exports = mongoose.model('User', userSchema);
