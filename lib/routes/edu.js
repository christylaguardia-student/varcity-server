const Router = require('express').Router;
const router = Router();
const Edu = require('../models/Edu');
const tokenService = require('../auth/token-service');
const User = require('../models/User');


router
  .get('/', (req, res, next) => {
    User.findById(req.user.id)
      .lean()
      .select('edu')
      .then(response => {
        return res.send(response.edu);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    User.findByIdAndUpdate(req.body)
      .save()
      .then(edu => {
        return User.findByIdAndUpdate(req.user.id,
          {
            $push:
            {
              edu: req.body
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
  })

  .delete('/athletes/:id/edu', (req, res, next) => {
    User.findOne(req.user.id)
      .then(user => {
        edu.findOneAndUpdate({
          institution: edu.user
        }, {
          $pull: {
            edu: req.body
          }
        }, {
          new: true,
          runValidators: true
        })
          .lean()
          .then(user => {
            res.send(user);
          })
          .catch(next);
      });
  });

module.exports = router;