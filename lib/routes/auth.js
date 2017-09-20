const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { exists, comparePassword, generateHash } = require('../models/User');
const tokenService = require('../auth/token-service');
const bodyParser = require('body-parser').json();

function hasRequiredFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ code: 401, message: 'Both email and password are required.' });
  }
  next();
}

router
  .post('/tokenator', bodyParser, async (req, res, next) => {
    const { token } = req.body;
    const user = await tokenService.verify(token);
    if (!user) return { code: 401, message: 'Not authorized' };
    return res.send(user.user._id);
  })
  .post('/signup', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    User.exists({ email })
      .then(exists => {
        console.log(4, exists);
        if (exists) {
          throw next({
            code: 400,
            error: 'email in use'
          });
        }

        let user = new User({
          email: email,
          password: password
        });

        const hash = user.generateHash(password);
        return user.save();
      })
      .then(withPassword => {
        return tokenService.sign(withPassword);
      })
      .then(token => {
        return res.send(token);
      })
      .catch(next);
  })
  .post('/signin', async (req, res, next) => {
    const { authorization } = req.headers || '';
    const { email, password } = req.body || '';
    if (authorization) {
      const user = await tokenService.verify(authorization);
      if (!user) return { code: 401, message: 'Not authorized' };
      return res.send({ user });
    } else {
      User.findOne({ email })
        .then(user => {
          if (!user || !user.comparePassword(password)) {
            throw next({
              code: 401,
              message: 'Invalid Login'
            });
          }
          return user;
        })
        .then(withPassword => {
          return tokenService.sign(withPassword);
        })
        .then(token => {
          return res.send(token);
        })
        .catch(next);
    }
  });

module.exports = router;
