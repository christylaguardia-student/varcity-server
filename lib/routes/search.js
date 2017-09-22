const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser').json();

router.post('/', bodyParser, async (req, res, next) => {
  const searchTerm = req.body.payload;
  User.find(
    {
      'info.public': true,
      $and: [
        {
          $text: { $search: searchTerm }
        }
      ]
    },
    {
      'info.firstName': 1,
      'info.lastName': 1,
      'info.profileUrl': 1,
      'info.primarySport': 1,
      'info.primarySportGender': 1,
      'info.location.city': 1,
      'info.location.state': 1,
      'info.location.country': 1
    }
  )
    .sort('info.lastName')
    .then(results => {
      return res.send(results);
    });
});

module.exports = router;
