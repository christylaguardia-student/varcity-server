const express = require('express');
const app = express();
const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();
const checkDB = require('./helpers/check-connection')();
const ensureAuth = require('./auth/ensure-auth')();
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/helpers/error-handler');

app.use(morgan('dev'));
app.use(bodyParser);

if (process.env.NODE_ENV === 'production') app.use(redirectHttp);
if (process.env.NODE_ENV !== 'production') app.use(checkDB);

const user = require('./routes/user');
const auth = require('./routes/auth');
const media = require('./routes/media');
const edu = require('./routes/edu');
const geodata = require('./routes/geodata');

app.use('/api/athletes/:id/media', ensureAuth, media);
app.use('api/athletes/:id/edu', ensureAuth, edu);
app.use('/api/athletes/', ensureAuth, user);
app.use('/api/auth', bodyParser, auth);
app.use('/api/geodata', geodata);

app.use(errorHandler());

module.exports = app;
