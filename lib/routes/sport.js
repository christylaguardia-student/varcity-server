const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    const { _id } = req.user.user;
    User.findById(_id)
      .lean()
      .select('sports')
      .then(sports => res.send(sports))
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .select('sport')
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
