const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sports = require('./sports');
const defaultPic = '/images/default-profile.png';

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  public: { type: Boolean, required: true, default: false },
  profileUrl: { type: String, default: defaultPic }, // TODO: should be an uploadable image
  primarySport: { type: String, enum: sports },
  position: String,
  person: {
    dob: Date,
    gender: String,
    height: Number,
    heightUom: { type: String, default: 'in', enum: [ 'in', 'cm' ] },
    weight: Number,
    weightUom: { type: String, default: 'lb', enum: [ 'lb', 'kg' ] },
  },
  organization: String,
  location: {
    city: String,
    state: String,
    country: String,
  },
  socials: {
    facebookUrl: String,
    twitterUrl: String,
    instagramUrl: String,
  }
});

module.exports = mongoose.model('Info', schema);
