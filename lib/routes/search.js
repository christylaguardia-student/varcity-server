const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser').json();
const tokenService = require('../auth/token-service');

router.post('/', bodyParser, async (req, res, next) => {
  // token is already on req.user. You don't want duplicate auth mechanisms
  // (headers AND payload)
  const { searchValue, token } = req.body.payload;
  const validUser = await tokenService.verify(token);
  // This is already a protected route :(
  if (validUser) {
    console.log(9090, searchValue);

    User.find(
      {
        'info.public': true
      },
      {
        'info.firstName': 1,
        'info.lastName': 1,
        'info.profileUrl': 1,
        'info.primarySport': 1,
        'info.primarySportGender': 1,
        'info.position': 1,
        'info.location.city': 1,
        'info.location.state': 1,
        'info.location.country': 1,
        'info.about': 1,
        'info.awards': 1,
        'info._id': 1
      }
    )
      // .sort('info.lastName')
      .then(results => {
        console.log(898989, results);
        return res.send(results);
      });
  // else ... never send a response????????
  } else return null;
});

module.exports = router;
