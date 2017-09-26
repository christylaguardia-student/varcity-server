const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stats = [{
  abbr: {
    type: String,
    required: true
  }, 
  value: {
    type: Number,
    required: true
  }
}];

const schema = new Schema({
  sport: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  stat: {
    basketball: stats,
    volleyball: stats,
    soccer: stats,
    baseball: stats, 
    softball: stats,
    football: stats
  },
  seasonDates: {
    type: Date
  }
});

module.exports = schema;