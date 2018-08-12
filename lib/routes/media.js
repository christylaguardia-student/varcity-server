const Router = require('express').Router;
const router = Router();
const User = require('../models/User');

router
  .get('/', (req, res, next) => {
    const { _id } = req.user.user;
    User.findById(_id)
      .lean()
      .select('media')
      .then(response => {
        return res.send(response.media);
      })
      .catch(next);
  })

  .patch('/', (req, res, next) => {
    // Limit conditionality to most narrow scope:
    const { _id } = req.user.user;
    const { description, mediaType, videoUrl, imageUrl } = req.body;

    const media = {
      description,
      mediaType
    }

    if (mediaType === 'Video Link') media.videoUrl = videoUrl;
    else if (mediaType === 'Image Link') media.imageUrl = imageUrl;


    User.findByIdAndUpdate(_id,
      {
        $push: { media }
      },
      {
        new: true,
        runValidators: true
      })
      .then(user => res.send(user.media))
      .catch(next);
    
  });

module.exports = router;
