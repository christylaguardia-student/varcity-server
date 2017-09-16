const Edu = require('../../lib/models/edu');
const { assert } = require('chai');

describe('Edu model', () => {
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