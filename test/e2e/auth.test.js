const req = require('./_request');
const chai = require('chai');
const assert = chai.assert;
const { drop } = require('./_db');

describe('user auth API', () => {
  before(drop);

  const testUserOne = {
    "email": "gtomkin0@prlog.org",
    "password": "QsaPZOdzP",
    "info": {
      "firstName": "Griffy",
      "lastName": "Tomkin",
      "public": true,
      "profileUrl": "http://dummyimage.com/197x193.png/dddddd/000000",
      "primarySport": "",
      "primarySportGender": "Male",
      "position": "goalie",
      "organization": "Yotz",
      "location": {
        "city": "Muqui",
        "country": "Peru"
      }
    },
    "bio": {
      "about": "Take astroturf robbed pickoff shift steal tossed appeal first base. Field peanuts astroturf airmail good eye",
      "awards": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
    },
    "edu": {
      "institution": "STMIK AMIKOM Yogyakarta",
      "year": 1995,
      "address": {
        "country": "Indonesia",
        "city": "Cipari"
      }
    }
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

  // eslint error on fat error ????
  it.skip('fails to save user if forgets email or pw', async () => {
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
