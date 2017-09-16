const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser').json();
const tokenService = require('../auth/token-service');

function hasRequiredFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      code: 400,
      error: 'Both email and password are required.'
    });
  }
  next();
}

router
  .post('/verify', hasRequiredFields, (req, res, next) => {
    res.send({ valid: true });
  })
  .post('/signup', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    const userExists = await User.exists({ email });
    if (userExists) return next({ code: 400, error: 'email in use' });

    const user = new User({
      email: email,
      password: password
    });

    const setPassword = await user.setPassword(password);
    const savedUser = await user.save();

    const token = await tokenService.sign(savedUser);
    return res.send({token});
  })
  .post('/signin', hasRequiredFields, (req, res, next) => {
    const { email, password } = req.body;
    delete req.body.password;

    User.findOne({ email })
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          throw next({
            code: 401,
            err: 'Invalid login'
          });
        }
        return user;
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  })
  .use(bodyParser);

module.exports = router;
