
const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;
const User = require('../../lib/models/User');

describe('media api', () => {

  before(db.drop);

  let mediaTestUser = {
    email: 'media@test.com',
    password: 'pword'
  };

  let token = '';
  before(async () => {
    token = await request.post('/api/auth/signup').send(mediaTestUser).then(res => res.body.token);
  });
  before(async () => mediaTestUser = await User.find({ email: 'media@test.com'}))

  const testImg = {
    description: 'testImg description',
    mediaType: 'image upload',
    imgUrl: './icons8-Basketball-64.png'
  };

  const testVideo = {
    description: 'testVideo description',
    mediaType: 'video link',    
    videoUrl: 'https://youtu.be/rNRFQ9mtEw4'
  };

  function saveMedia(media) {
    const userId = mediaTestUser[0]._id;
    return request
    .post(`/api/athletes/${userId}/media`)
    .set('Authorization', token)
    .send(media)
    .then(res => {
      let body = res.body;
      media._id = body._id;
      return media;
    });
  }
  
  it('Initial /GET returns empty list', () => {
    const userId = mediaTestUser[0]._id;    
    return request.get(`/api/athletes/${userId}/media`)
      .set('Authorization', token)
      .then(req => {
        const media = req.body;
        assert.deepEqual(media, []);
      });
  });

  
  it('saves a video', () => {
    return saveMedia(testVideo)
    .then(saved => assert.deepEqual(saved, testVideo));
  });
  
  it.only('saves an image', () => {
    return saveMedia(testImg)
      .then(saved => {
        console.log('saved is', saved);
        assert.deepEqual(saved, testImg);
      });
  });

  xit('Gets all media', () => {
    return Promise.all([
      saveMedia(testImg),
      saveMedia(testVideo)
    ])
      .then(savedMedia => {
        testImg = savedMedia[0];
        testVideo = savedMedia[1];
      })
      .then(() => request.get('/api/athletes/:id/media'))
      .then(res => res.body)
      .then(media => assert.deepEqual(media, [testImg, testVideo]));
  });


//   xit('patches a card', () => {
//     const url = `/api/cards/${testCard2._id}`;
//     return request.patch(url)
//       .send({ genus: 'something else' })
//       .then(res => res.body)
//       .then(res => assert.deepEqual(res.genus, 'something else'));
//   });

//   xit('deletes a card', () => {
//     const url = `/api/cards/${testCard2._id}`;
//     return request.delete(url)
//       .then(res => {
//         assert.deepEqual(res.body, { removed: true });
//         return res;
//       })
//       .then(() => request.delete(url))
//       .then(res => assert.deepEqual(res.body, { removed: false }));
//   });
});
