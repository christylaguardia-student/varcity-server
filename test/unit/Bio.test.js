const User = require('../../lib/models/User');

describe.skip('Bio Model', () => {

  it('validates with all fields', () => {
    const bio = new Bio({
      about: 'Hi my name is christy. I love beagles and ice cream.',
      awards: '#1 walker of my dog'
    });

    bio.validate();
  });    

});
