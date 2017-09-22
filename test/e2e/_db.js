const dbUri = process.env.MONGODB_URI || 'mongodb://maneki-neko:maneki-neko@ds135594.mlab.com:35594/varcity-test';
require('../../lib/helpers/connect')(dbUri);
const connection = require('mongoose').connection;

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};