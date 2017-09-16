const Router = require('express').Router;
const router = Router();
const fs = require('fs');
const Media = require('../models/Media');

router
  .get('/', (req, res, next) => {
    Media.find()
      .lean()
      .select('-__v')
      .then(media => res.send(media))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    const newItem = new Media(req.body);
    User.findById(req.params.id)


    if (newItem.videoUrl) {
      newItem
        .save()
        .then(media => res.send(media))
        .catch(next);
    } else if (newItem.imgUrl) {
      newItem.imgUrl.data = fs.readFileSync(req.files.userPhoto.path);
      newItem.img.contentType = '/image/png';
      newItem
        .save()
        .then(media => res.send(media))
        .catch(next);
    }
  });
  
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

// .delete('/athletes/:id/media', (req, res, next) => {
//   Media.findByIdAndRemove(req.params.id)
//     .then(response => res.send({ removed: !!response }))
//     .catch(next);
// });

module.exports = router;
