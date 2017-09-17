const Router = require('express').Router;
const router = Router();
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
  // limits: { fileSize: 2000000 },
  // dest: '../public/user-media/'
  // rename: function (fieldname, filename) {
  //   return filename;
  // },
});
const User = require('../models/User');

// references for using multer: 
// https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
// https://nyquist212.wordpress.com/2017/04/21/using-nodejs-expressjs-to-upload-and-save-image-files-into-mongodb-part-23/

router
  .get('/', (req, res, next) => {
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
        { $set: { media: req.body } },
        {
          new: true,
          runValidators: true
        })
        .then(athlete => {
          return res.send(athlete);
        })
        .catch(next);
    }
    else {
      User.findByIdAndUpdate(req.user.id,
        { $push: 
          { media: {
            img: req.files[0].buffer,
            description: 'text',
            mediaType: 'video upload'
          }
          } 
        },
        {
          new: true,
          // runValidators: true
        })
        .select('-_id')
        .then(user => res.send(user))
        .catch(next);

        // res.status(200).send(true);
        // res.end();
    }




    //   newItem.imgUrl.data = fs.readFileSync(req.file.path);
    //   newItem.img.contentType = '/image/png';
    //   newItem
    //     .save()
    //     .then(media => res.send(media))
    //     .catch(next);
    // }
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
