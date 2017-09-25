const Router = require('express').Router;
const router = Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    const { _id } = req.user.user;
    User.findById(_id)
      .select('media')
      .then(response => {
        return res.send(response.media);
      })
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    if (req.body.mediaType === 'Video Link') {
      const { _id } = req.user.user;

      User.findByIdAndUpdate(_id,
        {
          $push:
          {
            media: {
              description: req.body.description,
              mediaType: req.body.mediaType,
              videoUrl: req.body.videoUrl
            }
          }
        },
        {
          new: true,
          runValidators: true
        })
        .then(user => res.send(user.media))
        .catch(next);
    }
    else if (req.body.mediaType === 'Image Link') {
      const { _id } = req.user.user;

      User.findByIdAndUpdate(_id,
        {
          $push:
          {
            media: {
              description: req.body.description,
              mediaType: req.body.mediaType,
              imageUrl: req.body.imageUrl
            }
          }
        },
        {
          new: true,
          runValidators: true
        })
        .then(user => res.send(user.media))
        .catch(next);
    }
  });

module.exports = router;
