const express = require('express');
const app = express();
const morgan = require('morgan');
// const redirectHttp = require('./redirect-http')();
// const checkDB = require('./check-connection')();
const ensureAuth = require('./auth/ensure-auth')();
const bodyParser = require('body-parser').json();
const errorHandler = require('./error-handler')();

app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'production') app.use(redirectHttp);
// if(process.env.NODE_ENV !== 'production') app.use(checkDB);

const user = require('./routes/user');
const auth = require('./routes/auth');

app.use('/api/athletes/:id', user);
app.use('/api/auth', ensureAuth, auth);

module.exports = app;
