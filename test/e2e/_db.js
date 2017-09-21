<<<<<<< HEAD
process.env.MONGODB_URI = 'mongodb://localhost:27017/varcity-test';
require('../../lib/connect');
=======
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/varcity-test';
require('../../lib/helpers/connect')(dbUri);
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
const connection = require('mongoose').connection;

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};