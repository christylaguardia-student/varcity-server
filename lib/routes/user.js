const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/:id/info', (req, res, next) => {
    User.findById(req.params.id)
      .select('info')
      .then(user => {
        if (!user) res.status(404).send(`Cannot GET user info with ID ${req.params.id}`);
        else res.send(user);
      })
      .catch(next);
  })

  .get('/:id/bio', (req, res, next) => {
    User.findById(req.params.id)
      .select('bio')
      .then(user => {
        if (!user) res.status(404).send(`Cannot GET user bio with ID ${req.params.id}`);
        else res.send(user);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
