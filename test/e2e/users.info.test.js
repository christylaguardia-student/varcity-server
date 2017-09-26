const request = require('./_request');
const assert = require('chai').assert;
const { drop } = require('./_db');

describe('User API', () => {

  let testUser = {
    email: 'test@test.com',
    password: '1234'
  };

  const testInfo = {
    info: {
      firstName: 'Christy',
      lastName: 'La Guardia'
    }
  };

  let token = '';
  
  before(drop);

  before(() => {
    return request
      .post('/api/auth/signup')
      .send(testUser)
      .then(res => {
        token = res.body.token;
        testUser._id = res.body.user._id;
      });
  });

  describe('Info', () => {
  
    it('PATCHes user info', () => {

      return request
        .patch(`/api/athletes/${testUser._id}`)
        .send(testInfo)
        .set('Authorization', token)
        .then(res => {
          assert.equal(res.body._id, testUser._id);
          assert.equal(res.body.info.firstName, testInfo.info.firstName);
          assert.equal(res.body.info.lastName, testInfo.info.lastName);
        });
    });

    it('GETs users info', () => {
      return request
        .get(`/api/athletes/${testUser._id}`)
        .set('Authorization', token)
        .then(res => {
          assert.equal(res.body._id, testUser._id);
          assert.equal(res.body.info.firstName, testInfo.info.firstName);
          assert.equal(res.body.info.lastName, testInfo.info.lastName);
        });
    });

  });

});