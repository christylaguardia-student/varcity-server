const Sport = ('../../lib/models/sport');
const { assert } = require('chai');

describe('Sport model', () => {
  it('validates required fields', () => {
    const sport = new Sport({
      sport: 'Basketball',
      organization: 'OSU',
      position: 'Shooting Guard'
    });
    return sport.validate();
  });

  it('fails validation when required fields are missing', () => {
    const sport = new Sport();
    return sport.validate()
      .then( () => { throw new Error('Expected validation error');
      },
      ({ errors }) => {
        assert.ok(errors.sport);
        assert.ok(errors.organization);
        assert.ok(errors.position);
      });
  });
});