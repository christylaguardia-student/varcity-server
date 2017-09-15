const Router = require('express').Router;
const router = Router();
const Media = require('../models/Media');

router
  .get('/athletes/:id/media', (req, res, next) => {
    Media.find()
      .lean()
      .select('-__v')
      .then(media => res.send(media))
      .catch(next);
  })

  // .patch('/athletes/:id/media', (req, res, next) => {
  //   Media.findByIdAndUpdate(req.params.id,
  //     { $set: req.body },
  //     {
  //       new: true,
  //       runValidators: true
  //     })
  //     .then(media => res.send(media))
  //     .catch(next);

  // })

  .post('/athletes/:id/media', (req, res, next) => {
    new Media(req.body)
      .save()
      .then(media => res.send(media))
      .catch(next);
  });

  // .delete('/athletes/:id/media', (req, res, next) => {
  //   Media.findByIdAndRemove(req.params.id)
  //     .then(response => res.send({ removed: !!response }))
  //     .catch(next);
  // });

module.exports = router;
