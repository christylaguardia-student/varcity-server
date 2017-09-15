const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('media api', () => {

  before(db.drop);

  let testImg = {
    description: 'testImg description',
    imgUrl: './media.test.js'
  };

  let testVideo = {
    description: 'testVideo description',
    videoUrl: 'https://youtu.be/rNRFQ9mtEw4'
  };

  function saveMedia(media) {
    return request
      .post('/api/athletes/:id/media')
      .send(media)
      .then(res => {
        let body = res.body;
        media._id = body._id;
        return media;
      });
  }

  it('Initial /GET returns empty list', () => {
    return request.get('/api/athletes/:id/media')
      .then(req => {
        const media = req.body;
        assert.deepEqual(media, []);
      });
  });

  it('saves a card', () => {
    return saveMedia(testImg)
      .then(saved => {
        assert.deepEqual(saved, testImg);
      });
  });

  it('Gets all media', () => {
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

  xit('patches a card', () => {
    const url = `/api/cards/${testCard2._id}`;
    return request.patch(url)
      .send({ genus: 'something else' })
      .then(res => res.body)
      .then(res => assert.deepEqual(res.genus, 'something else'));
  });

  xit('deletes a card', () => {
    const url = `/api/cards/${testCard2._id}`;
    return request.delete(url)
      .then(res => {
        assert.deepEqual(res.body, { removed: true });
        return res;
      })
      .then(() => request.delete(url))
      .then(res => assert.deepEqual(res.body, { removed: false }));
  });
});
