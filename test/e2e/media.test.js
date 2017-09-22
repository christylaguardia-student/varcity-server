const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
const User = require('../../lib/models/User');
const path = require('path');
const { drop } = require('./_db');
const {verify} = require('../../lib/auth/token-service')

describe('media api', () => {
  let mediaTestUser = {
    email: 'media@test.com',
    password: 'pword'
  };

  let token = '';
  before(drop);
  before(async () => {
    return request
      .post('/api/auth/signup')
      .send(mediaTestUser)
      .then(token => {
        return token.body;
      })
      .then(tokenizedUser => {
        token = tokenizedUser.token
        return request
          .post('/api/auth/signin')
          .set('Authorization', token)
          .then(user => {
            mediaTestUser = user.body;
            mediaTestUser.token = token
            return mediaTestUser;
          });
        return mediaTestUser;
      });
    return mediaTestUser;
  });

  const imagePath = path.join(__dirname, '/icons8-Basketball-64.png');

  let testImg = {
    description: 'testImg description',
    mediaType: 'image upload',
    img: imagePath
  };

  let testVideo = {
    description: 'testVideo description',
    mediaType: 'video link',
    videoUrl: 'https://youtu.be/rNRFQ9mtEw4'
  };

  let newTestImg = {
    description: 'New testImg description',
    mediaType: 'image upload',
    img: imagePath
  };

  let newTestVideo = {
    description: 'New testVideo description',
    mediaType: 'video link',
    videoUrl: 'https://youtu.be/rNRFQ9mtEw4'
  };

  function saveVideo(video) {
    const { _id } = mediaTestUser.user;
    const token = mediaTestUser.token;
    return request
      .post(`/api/athletes/${_id}/media`)
      .set('Authorization', token)
      .send(video)
      .then(res => {
        let body = res.body;
        return video;
      });
  }

  function saveImage(image) {
    const { _id } = mediaTestUser.user;
    const token = mediaTestUser.token;
    return request
      .patch(`/api/athletes/${_id}/media`)
      .set('Authorization', token)
      .field('description', image.description)
      .field('mediaType', image.mediaType)
      .attach('image', image.img)
      .then(res => {
        let body = res.body;
        return image;
      });
  }

  it('Initial /GET returns empty list', () => {
    const {token} = mediaTestUser;
    const {_id} = mediaTestUser.user.user

    return request
      .get(`/api/athletes/${_id}/media`)
      .set('Authorization', token)
      .then(req => {
        const media = req.body;
        assert.deepEqual(media, []);
      });
  });

  it('saves a video', () => {
    return saveVideo(testVideo).then(saved =>
      assert.deepEqual(saved, testVideo)
    );
  });

  it('saves an image', () => {
    return saveImage(testImg).then(saved => assert.deepEqual(saved, testImg));
  });

  it('Gets all media', () => {
    const { _id } = mediaTestUser.user;
    const token = mediaTestUser.token;

    return Promise.all([saveImage(newTestImg), saveVideo(newTestVideo)])
      .then(savedMedia => {
        newTestImg = savedMedia[0];
        newTestVideo = savedMedia[1];
      })
      .then(() =>
        request
          .get(`/api/athletes/${_id}/media`)
          .set('Authorization', token)
          .then(res => res.body)
          .then(media => {
            assert.deepEqual(media[3].description, newTestImg.description);
            assert.deepEqual(media[2], newTestVideo);
          })
      );
  });

  xit('patches a media', () => {
    const userId = mediaTestUser._id;
    return request
      .patch(url)
      .send({ genus: 'something else' })
      .then(res => res.body)
      .then(res => assert.deepEqual(res.genus, 'something else'));
  });

  xit('deletes a piece of media', () => {
    const userId = mediaTestUser._id;
    return request
      .delete(url)
      .then(res => {
        assert.deepEqual(res.body, { removed: true });
        return res;
      })
      .then(() => request.delete(url))
      .then(res => assert.deepEqual(res.body, { removed: false }));
  });
});
