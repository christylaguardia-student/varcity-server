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

  it('signs up a user successfully', async () => {
    const newToken = await req.post('/api/auth/signup').send(testUserOne);
    assert.equal(newToken.statusCode, 200);
    assert.isObject(newToken.body);
  }),
    it('checks credentials then retrieves the user', async () => {
      const newToken = await req.post('/api/auth/signup').send(testUserTwo);
      console.log('newToken: ', newToken.body.token);
      const verifiedUser = await req
        .post('/api/auth/signin')
        .set('Authorization', newToken.body.token)
        .send(testUserTwo);
      assert.equal(newToken.statusCode, 200);
      assert.isObject(newToken.body);
    }),
    it.skip('fails if user forgets email or pw', async () => {
      return req
        .post('/users/verify')
        .send(seedPeople[2])
        .then(res => {
          // console.log('verify: ',res.body);
          assert.equal(res.code, 400);
          assert.equal(res.error, 'Both email and password are required.');
        });
    });
});
