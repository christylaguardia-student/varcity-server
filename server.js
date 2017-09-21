/* eslint no-console: "off" */
require('dotenv').config();
const app = require('./lib/app');
const http = require('http');

const connect = require('./lib/helpers/connect');
const dbUri = process.env.MONGODB_URI;
connect(dbUri);

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server running on', server.address());
});
