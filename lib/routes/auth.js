const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { exists, comparePassword, generateHash } = require('../models/User');
const tokenService = require('../auth/token-service');
const bodyParser = require('body-parser').json();

function hasRequiredFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ code: 401, name: 'Both email and password are required.' });
  }
  next();
}

router
  .post('/verify', bodyParser, hasRequiredFields, async (req, res, next) => {
    return res.send({ valid: true });
  })
  .post('/signup', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    User.exists({ email })
      .then(exists => {
        if (exists) {
          throw next({
            code: 400,
            error: 'email in use'
          });
        }
        const user = new User({
          email: email,
          password: password
        });

        user.generateHash(password);
        return user.save();
      })
      .then(user => {
        return  tokenService.sign(user);
      })
      .then(token => {
        res.send({ token });
      })
      .catch(next);
  })
  .post('/signin', async (req, res, next) => {
    const token = await tokenService.verify(req.headers.authorization);
    if (!token) return { code: 401, message: 'Not authorized' };
    return res.send(token);
  })
  .get('/sandbox', async (req, res, next) => {
  })
  .post('/change', async (req, res, next) => {
    const {value} = req.query
    const user = new User({value: value});
    const updatedText = await user.update()
    res.send(updatedText)
  })
module.exports = router;
