const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser').json();
const tokenService = require('../auth/token-service');

router.post('/', bodyParser, async (req, res, next) => {
  const { searchValue, token } = req.body.payload;
  const validUser = await tokenService.verify(token);

  if (validUser) {
    User.find({ 'info.public': true, $text: { $search: searchValue } })
      .select(
        'info.firstName info.lastName info.primarySport info.primarySportGender'
      )
      .then(results => {
        return res.send(results);
      })
      .catch(next);
  }
});

module.exports = router;
