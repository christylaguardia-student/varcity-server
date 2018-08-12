const express = require('express');
const router = express.Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    const { _id } = req.user.user;

    User.findById(_id)
      .select('info')
      .lean()
      .then(user => {
        if (!user) res.status(404).send(`Cannot GET user INFO with ID ${_id}`);
        else res.send(user);
      })
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    const { _id } = req.user.user;
    // You need to limit the update to just the `info` prop.
    // Passing req.body is too broad for this route
    User.findByIdAndUpdate(_id, req.body, {new:true})
      .select('info')
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;
