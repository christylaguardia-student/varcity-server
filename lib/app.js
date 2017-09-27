const express = require('express');
const app = express();
const morgan = require('morgan');
const redirectHttp = require('./helpers/redirect-http')();
const checkDB = require('./helpers/check-connection')();
const ensureAuth = require('./auth/ensure-auth')();
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/helpers/error-handler');

app.use(morgan('dev'));
app.use(bodyParser);
app.use(express.static('./public'));

if (process.env.NODE_ENV === 'production') app.use(redirectHttp);
if (process.env.NODE_ENV !== 'production') app.use(checkDB);

const auth = require('./routes/auth');
const info = require('./routes/info');
const edu = require('./routes/edu');
const sport = require('./routes/sport');
const media = require('./routes/media');
const search = require('./routes/search');
const geodata = require('./routes/geodata');

app.use('/api/auth', auth);
app.use('/api/athletes/:id/edu', ensureAuth, edu);
app.use('/api/athletes/:id/sport', ensureAuth, sport);
app.use('/api/athletes/:id/media', ensureAuth, media);
app.use('/api/athletes/:id', ensureAuth, info);
app.use('/api/search', ensureAuth, search);
app.use('/api/geodata', geodata);

app.use(errorHandler());

module.exports = app;
