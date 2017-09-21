const Router = require('express').Router;
const router = Router();
const Sport = require('../models/Sport');



router
  .get('/', (req, res, next) => {
    User.findById(req.user.id)
      .lean()
      .select('sport')
      .then(response => {
        return res.send(response.edu);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    User.findByIdAndUpdate(req.body)
      .save()
      .then(sport => {
        return User.findByIdAndUpdate(req.user.id,
          {
            $push:
            {
              sport: req.body
            }
          },
          {
            new: true,
            runValidators: true
          }
        )
          .then(user => res.send(user))
          .catch(next);
      });
  });

module.exports = router;