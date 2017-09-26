const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    User.findById(req.params.id)
      .select('sport')
      .then(user => {
        if (!user) res.status(404).send(`Cannot GET user SPORT with ID ${req.params.id}`);
        else res.send(user);
      })
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .select('sport')
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
