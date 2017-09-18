const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    User.findById(req.params.id)
      .select('info bio')
      .then(user => {
        if (!user) res.status(404).send(`Cannot GET user with ID ${req.params.id}`);
        else res.send(user);
      })
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
