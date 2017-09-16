const Router = require('express').Router;
const router = Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({
  limits: { fileSize: 2000000 },
  dest: './uploads/'
  // rename: function (fieldname, filename) {
    //   return filename;
    // },
  });
  const Media = require('../models/Media');
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

  .post('/', upload.single('picture'), (req, res, next) => {
    const newItem = new Media(req.body);
    // User.findById(req.params.id)


    // if (newItem.videoUrl) {
    //   newItem
    //     .save()
    //     .then(media => res.send(media))
    //     .catch(next);
    // } else if (newItem.imgUrl) {

      newItem.imgUrl.data = fs.readFileSync(req.file.path);
      newItem.img.contentType = '/image/png';
      newItem
        .save()
        .then(media => res.send(media))
        .catch(next);
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
