const assert = require('chai').assert;
const Info = require('../../lib/models/Info');

describe.skip('Info Model', () => {

  it('validates with required fields', () => {
    const info = new Info({
      firstName: 'Christy',
      lastName: 'La Guardia'
    });

    return info.validate();
  });

  it('validation fails without required fields', () => {
    const info = new Info();
    
    return info.validate()
      .then(
        () => { throw new Error('expected data validation error'); },
        ({ errors }) => {
          assert.ok(errors.firstName);
          assert.ok(errors.lastName);
        }
      );
  });

  it('validates with all fields', () => {
    const info = new Info({
      firstName: 'Christy',
      lastName: 'La Guardia',
      public: true,
      profileUrl: 'http://www.laguardia.io/images/main/paper-plane-blue-120px.jpg',
      primarySport: 'Women\'s Volleyball',
      position: 'I dunno',
      person: {
        dob: new Date(4, 23, 1987),
        height: '60',
        heigthUom: 'cm',
        weight: '80',
        weightUom: 'kg'
      },
      organization: 'Alchemy Code Lab',
      location: {
        city: 'Portland',
        state: 'OR',
        country: 'USA'
      },
      socials: {
        facebookUrl: 'http://facebook.com',
        twitterUrl: 'http://twitter.com',
        instagramUrl: 'http://instagram.com'
      }
    });

    return info.validate();
  });

});
