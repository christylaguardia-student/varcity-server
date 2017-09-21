<<<<<<< HEAD
const Edu = require('../../lib/models/edu');
const { assert } = require('chai');

describe('Edu model', () => {
=======
const Edu = require('../../lib/models/Edu');
const { assert } = require('chai');

describe.skip('Edu model', () => {
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
  it('validates required fields', () => {
    const edu = new Edu({
      institution: 'Harvard'
    });
    return edu.validate();
  });

  it('fails validation when required fields are missing', () => {
    const edu = new Edu();
<<<<<<< HEAD
    
=======
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
    return edu.validate()
      .then( () => { throw new Error('Expected validation error');
      },
      ({ errors }) => {
        assert.ok(errors.institution);
      });
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> 966853669b12b03cb04ad72ae7b5727f24fa5462
