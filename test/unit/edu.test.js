const Edu = require('../../lib/models/Edu');
const { assert } = require('chai');

describe.skip('Edu model', () => {
  it('validates required fields', () => {
    const edu = new Edu({
      institution: 'Harvard'
    });
    return edu.validate();
  });

  it('fails validation when required fields are missing', () => {
    const edu = new Edu();
    return edu.validate()
      .then( () => { throw new Error('Expected validation error');
      },
      ({ errors }) => {
        assert.ok(errors.institution);
      });
  });
});
