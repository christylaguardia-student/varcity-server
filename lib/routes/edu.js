const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    const { _id } = req.user.user;
    User.findById(_id)
      .lean()
      .select('edu')
      .then(response => {
        return res.send(response.edu || {});
      })
      .catch(next);
  })

  // TODO: write correct patch for edu
  .patch('/', (req, res, next) => {
    // need to limit update to edu, not all of user
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .lean()
      .select('edu')
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
