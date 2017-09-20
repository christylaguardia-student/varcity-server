const req = require('./_request');
const chai = require('chai');
const assert = chai.assert;
const { drop } = require('./_db');

describe('user auth API', () => {
  before(drop);

  const testUserOne = {
    email: 'tokenjoeOne@joe.com',
    password: 'abc'
  };
  const testUserTwo = {
    email: 'tokenjoeTwo@joe.com',
    password: 'abc'
  };
  const testUserThree = {
    email: null,
    password: 'qwerty'
  };

  it('signs up a user successfully', () => {
    return req
      .post('/api/auth/signup')
      .send(testUserOne)
      .then(newToken => {
        assert.equal(newToken.statusCode, 200);
        assert.isObject(newToken.body);
      });
  }),
    it('checks credentials then retrieves the user', () => {
      return req
        .post('/api/auth/signup')
        .send(testUserTwo)
        .then(user => {
          req.post('/api/auth/signin').set('Authorization', user.body.token);
        });
      assert.equal(newToken.statusCode, 200);
      assert.isObject(newToken.body);
    }),
    it('fails to save user if forgets email or pw', async () => {
      const failedPerson = await req
        .post('/api/auth/signup')
        .send(testUserThree);
      assert.equal(failedPerson.body.code, 401);
      assert.equal(
        failedPerson.body.name,
        'Both email and password are required.'
      );
    });
});
