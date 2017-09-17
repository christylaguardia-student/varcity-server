const express = require('express');
const router = express.Router();
const User = require('../models/User');
const tokenService = require('../auth/token-service');

function hasRequiredFields(req, res, next) {
  console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    return next({code:401, name:'Both email and password are required.'});
  }
  next();
}

router
  .post('/verify', hasRequiredFields, async (req, res, next) => {
    return res.send({ valid: true });
  })
  .post('/signup', hasRequiredFields, async (req, res, next) => {
    console.log(1, 'server signup: ', req.body)
    const { email, password } = req.body;
    delete req.body.password;
    console.log(1.5, email)

    const userExists = await User.exists({ email });
    if (userExists === true) {
      return next({ code: 401, name: 'email in use' });
    }

    // console.log(2, userExists)

    // if (userExists)
    // console.log(3, userExists)

    const user = new User({ email: email, password: password });
    console.log(4, user)
    const setPassword = await user.setPassword(password);
    console.log(4.5, setPassword)

    const savedUser = await user.save();
    console.log(5, savedUser)

    const token = await tokenService.sign(savedUser);
    return res.send({ token });
  })
  .post('/signin', hasRequiredFields, async (req, res, next) => {
    const { email, password } = req.body;
    delete req.body.password;
    const verifyUser = await User.findOne({ email });
    const invalidUser = await (!verifyUser ||
      !verifyUser.comparePassword(password));
    if (invalidUser) return next({ code: 401, name: 'Invalid login' });
    const userToken = await tokenService.sign(verifyUser);
    return res.send({ userToken });
  })
  .get('/sandbox', async (req, res, next) => {
    console.log('get sandbox: ', req.body);
  })
  .post('/change', async (req, res, next) => {
    console.log('in server api: ',req.body)
    // const {value} = req.query
    // const sandbox = new User({value: value});
    // const updatedText = await User.update()
    // res.send(updatedText)
  })

module.exports = router;
