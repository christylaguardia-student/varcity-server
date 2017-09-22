const Router = require('express').Router;
const router = Router();
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
    const {_id} = req.user.user;
    console.log('in media get, id is', _id);
    User.findById(_id)
      .select('media -_id')
      .then(response => {
        console.log('in media get, response.media is', response.media);
        return res.send(response.media);
      })
      .catch(next);
  })
    
  .patch('/', upload.any(), (req, res, next) => {
    console.log('in media post, req.body is', req.body);
    
    if (req.body.mediaType === 'Video Link') {
      const { _id } = req.user.user;
      const media = req.body;
        
      console.log('in media post, id is', _id, 'media is', media);
      User.findByIdAndUpdate(_id,
        {
          $push:
            {
              media: media
            }
        },
        {
          new: true,
          runValidators: true
        })
        .then(athlete => {
          console.log('sending back athlete.media:', athlete.media);
          
          return res.send(athlete.media);
        })
        .catch(next);
    }
    else if (req.body.mediaType === 'Image Upload') {
      const { _id } = req.user.user;
      console.log('in media post, id is', _id, 'req.body is', req.body);
      
      User.findByIdAndUpdate(_id,
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
        .then(user => {
          console.log('sending back user.media:', user.media);
          return res.send(user.media);
        })
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
