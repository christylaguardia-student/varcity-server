const mongoose = require('mongoose');
const assert = require('chai').assert;
const MediaSchema = require('../../lib/models/Media');

describe('Media Schema', () => {

  const Media = mongoose.model('Media', MediaSchema);

  it('validates a good model', () => {
    const media = new Media({
      description: 'Test Desc',
      mediaType: 'Video Link',
      videoUrl: 'youtubelink.com'
    });
    return media.validate();
  });

  describe('validation failures', () => {

    const expectedValidation = () => { throw new Error('expected validation errors'); };
    
    it('fails if required fields missing', () => {
      const media = new Media();
      return media.validate()
        .then(expectedValidation,
          err => {
            const errors = err.errors;
            assert.ok(errors.description && errors.mediaType);
            assert.equal(errors.description.kind && errors.mediaType.kind, 'required');
          });
    });
  });
});