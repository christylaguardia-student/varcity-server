const SportSchema = require('../../lib/models/sport');
const { assert } = require('chai');
const mongoose = require('mongoose');

describe('Sport Model', () => {

  const Sport = mongoose.model('Sport', SportSchema);

  it('validates with required fields', () => {
    const sport = new Sport({
      sport: 'Basketball',
      sportGender: 'Men\'s',
      organization: 'OSU',
      position: 'Shooting Guard',
      stats: [
        { abbr: 'GP', value: 3 },
        { abbr: 'P', value: 12 },
        { abbr: 'R', value: 4 },
      ],
      seasonStart: '2017-01-01',
      seasonEnd: '2017-03-01'
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
        assert.ok(errors.sportGender);
        assert.ok(errors.organization);
        assert.ok(errors.position);
      });
  });

  it('sport and sportGender should be of enum type', () => {
    const sport = new Sport({
      sport: 'bad sport',
      sportGender: 'bad gender',
      organization: 'Alchemy Code Lab',
      position: 'Coder',
    });

    return sport.validate()
      .then( () => { throw new Error('Expected validation error');
      },
      ({ errors }) => {
        assert.equal(errors.sport.kind, 'enum');
        assert.equal(errors.sportGender.kind, 'enum');
      });

  });

});