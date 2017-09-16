const express = require('express');
const router = express.Router();
const User = require('../models/User');
const tokenService = require('../auth/token-service');

function hasRequiredFields(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({err:{ code: 400, error: 'Both email and password are required.' }});
  }
  next();
}

router
  .post('/verify', hasRequiredFields, async (req, res, next) => {
    return res.send({ valid: true });
  })
  .post('/signup', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    const userExists = await User.exists({ email });
    if (userExists) return next({ code: 400, error: 'email in use' });

    const user = new User({ email: email, password: password });
    const setPassword = await user.setPassword(password);
    const savedUser = await user.save();
    const token = await tokenService.sign(savedUser);
    return res.send({ token });
  })
  .post('/signin', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    delete req.body.password;
    const verifyUser = await User.findOne({ email });
    const invalidUser = await (!verifyUser ||
      !verifyUser.comparePassword(password));
    if (invalidUser) return next({ code: 401, err: 'Invalid login' });
    const userToken = await tokenService.sign(verifyUser);
    return res.send({ userToken });
  })

module.exports = router;
