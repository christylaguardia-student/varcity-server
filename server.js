/* eslint no-console: "off" */
require('dotenv').config();
const app = require('./lib/app');
const http = require('http');
require('./lib/helpers/connect')(process.env.MONGODB_URI ||'mongodb://localhost:27017/varcity');
const connection = require('mongoose').connection;

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server running on', server.address());
});
