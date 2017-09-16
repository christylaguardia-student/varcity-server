require('mongoose').Promise = Promise;
const assert = require('chai').assert;
const Media = require('../../lib/models/Media');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('Media model', () => {

  xit('validates a good model', () => {
    const media = new Media({
      description: 'Test Desc',
      videoUrl: 'youtubelink.com',
      imgUrl: true
    });
    return media.validate();
  });

  describe('validation failures', () => {

    xit('fails if required fields missing', () => {
      const media = new Media();
      return media.validate()
        .then(expectedValidation,
          err => {
            const errors = err.errors;
            assert.ok(errors.description && errors.videoUrl && errors.imgUrl);
            assert.equal(errors.description.kind && errors.videoUrl.kind && errors.imgUrl.kind, 'required');
          });
    });
  });
});