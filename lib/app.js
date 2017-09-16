const express = require('express');
const app = express();
const morgan = require('morgan');
// const redirectHttp = require('./redirect-http')();
// const checkDB = require('./check-connection')();
const ensureAuth = require('./auth/ensure-auth')();
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/helpers/error-handler')();

app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'production') app.use(redirectHttp);
// if(process.env.NODE_ENV !== 'production') app.use(checkDB);

const user = require('./routes/user');
const auth = require('./routes/auth');

app.use('/api/athletes/:id', ensureAuth, user);
app.use('/api/auth', bodyParser, auth);

module.exports = app;
