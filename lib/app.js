const express = require('express');
const app = express();
// const morgan = require('morgan');
// const redirectHttp = require('./redirect-http')();
// const checkDB = require('./check-connection')();
// const ensureAuth = require('./auth/ensure-auth')();
// const bodyParser = require('body-parser').json();
// const errorHandler = require('./error-handler')();

// app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'production') app.use(redirectHttp);

// app.use(bodyParser);
app.use(express.static('./public'));

// const auth = require('./routes/auth');
// const me = require('./routes/me');
// const cards = require('./routes/cards');

// if(process.env.NODE_ENV !== 'production') app.use(checkDB);

// app.use('/api/auth', auth);
// app.use('/api/me', ensureAuth, me);
// app.use('/api/cards', cards);

app.use('/hello', (req, res) => {
  res.send('Hello World');
});


// app.use(errorHandler);

module.exports = app;
