/* eslint no-console: off */

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-game';

mongoose.connect(dbUri);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open on', dbUri);
});

mongoose.connection.on('error', error => {
  console.log('Mongoose default connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
