const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sports = require('../utils/sports');
const defaultPic = '/images/default-profile.png';

const schema = new Schema({
  firstName: { type: String, required: true, text: true },
  lastName: { type: String, required: true, text: true },
  public: { type: Boolean, required: true, default: false },
  profileUrl: { type: String, default: defaultPic, text: true },
  primarySport: { type: String, enum: sports, text: true },
  primarySportGender: { type: String, text: true },
  position: {type: String, text: true},
  person: {
    dob: Date,
    gender: String,
    height: Number,
    heightUom: { type: String, default: 'in', enum: [ 'in', 'cm' ] },
    weight: Number,
    weightUom: { type: String, default: 'lb', enum: [ 'lb', 'kg' ] },
  },
  organization: {type: String, text: true},
  location: {
    city: {type: String, text: true},
    state: {type: String, text: true},
    country: {type: String, text: true},
  },
  socials: {
    facebookUrl: String,
    twitterUrl: String,
    instagramUrl: String,
  }
});
schema.index({firstName: 'text', lastName: 'text', profileUrl:'text', primarySport:'text', primarySportGender: 'text', position: 'text', organization:'text', 'location.city':'text', 'location.state':'text', 'location.country':'text'})
module.exports = schema;
