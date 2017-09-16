const req = require('./_request');
const chai = require('chai');
const assert = chai.assert;
const { drop } = require('./_db');

describe('user auth API', () => {
  before(async () => drop());

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

  it('signs up a user successfully', async () => {
    const newToken = await req.post('/api/auth/signup').send(testUserOne);
    assert.equal(newToken.statusCode, 200);
    assert.isObject(newToken.body);
  }),
    it('checks credentials then retrieves the user', async () => {
      const newToken = await req.post('/api/auth/signup').send(testUserTwo);
      const verifiedUser = await req
        .post('/api/auth/signin')
        .set('Authorization', newToken.body.token)
        .send(testUserTwo);
      assert.equal(newToken.statusCode, 200);
      assert.isObject(newToken.body);
    }),
    it('fails to save user if forgets email or pw', async () => {
      const failedPerson = await req
        .post('/api/auth/verify')
        .send(testUserThree);
        console.log(failedPerson)
      assert.equal(testUserThree.code, 400);
      assert.equal(
        testUserThree.error,
        'Both email and password are required.'
      );
    });
});
