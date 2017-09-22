// const dbUri = process.env.MONGODB_URI || 'mongodb://maneki-neko:maneki-neko@ds135594.mlab.com:35594/varcity-test';
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/varcity'
require('../../lib/helpers/connect')(dbUri);
const connection = require('mongoose').connection;

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};