const Router = require('express').Router;
const router = Router();
// const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});
const User = require('../models/User');

// references for using multer:
// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
// https://nyquist212.wordpress.com/2017/04/21/using-nodejs-expressjs-to-upload-and-save-image-files-into-mongodb-part-23/

router
  .get('/', (req, res, next) => {
    console.log('req.user.id is', req.user.id, 'req.body s', req.body);
    User.findById(req.user.id)
      .select('media -_id')
      .then(response => {
        return res.send(response.media);
      })
      .catch(next);
  })

  .post('/', upload.any(), (req, res, next) => {
    if (req.body.mediaType === 'video link') {
      User.findByIdAndUpdate(req.user.id,
        { 
          $push: 
            { 
              media: req.body
            } 
        },
        {
          new: true,
          runValidators: true
        })
        .then(athlete => res.send(athlete))
        .catch(next);
    }
    else {
      User.findByIdAndUpdate(req.user.id,
        {
          $push:
          {
            media: {
              description: req.body.description,
              mediaType: req.body.mediaType,
              img: req.files[0].buffer
            }
          }
        },
        {
          new: true,
          runValidators: true
        })
        .then(user => res.send(user))
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
