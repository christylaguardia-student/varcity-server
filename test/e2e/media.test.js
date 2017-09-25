const request = require('./_request');
const assert = require('chai').assert;
const { drop } = require('./_db');

describe('media api', () => {
  let mediaTestUser = {
    email: 'media@test.com',
    password: 'pword'
  };

  let token = '';
  before(drop);
  before(() => {
    return request
      .post('/api/auth/signup')
      .send(mediaTestUser)
      .then(response => {
        token = response.body.token;
        mediaTestUser._id = response.body.user._id;
      });
  });

  let testImg = {
    description: 'testImg description',
    mediaType: 'Image Link',
    imageUrl: 'www.image.com'
  };

  let testVideo = {
    description: 'testVideo description',
    mediaType: 'Video Link',
    videoUrl: 'https://youtu.be/rNRFQ9mtEw4'
  };

  let newTestImg = {
    description: 'New testImg description',
    mediaType: 'Image Link',
    imageUrl: 'www.newimage.com'
  };

  let newTestVideo = {
    description: 'New testVideo description',
    mediaType: 'Video Link',
    videoUrl: 'https://4.vimeo.com'
  };

  function saveMedia(media) {
    const { _id } = mediaTestUser;
    return request
      .patch(`/api/athletes/${_id}/media`)
      .set('Authorization', token)
      .send(media)
      .then(res => res.body);
  }

  it('Initial /GET returns empty list', () => {
    const {_id} = mediaTestUser;
    return request
      .get(`/api/athletes/${_id}/media`)
      .set('Authorization', token)
      .then(req => {
        const media = req.body;
        assert.deepEqual(media, []);
      });
  });

  it('saves a video', () => {
    return saveMedia(testVideo).then(saved => assert.deepEqual(saved, [testVideo]));
  });

  it('saves an image', () => {
    return saveMedia(testImg).then(saved => assert.deepEqual(saved, [testVideo, testImg]));
  });

  it('Gets all media', () => {
    const { _id } = mediaTestUser;
    return Promise.all([
      saveMedia(newTestImg), 
      saveMedia(newTestVideo)
    ])
      .then(() =>
        request
          .get(`/api/athletes/${_id}/media`)
          .set('Authorization', token)
          .then(res => res.body)
          .then(media => {
            assert.deepEqual(media.length, 4);
          })
      );
  });
});