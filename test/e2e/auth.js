const req = require('./_request');
const chai = require('chai');
const assert = chai.assert;

describe('user auth API', () => {
  let token = '';

  before(() => {
    // return req.post('/users/signup')
    //     .send(seedPeople[0])
    //     .then(res => {
    //         token = res.body.token;
    //     });
  });

const testUser = {
  email: 'tokenjoe@joe.com',
  password: 'abc'
}

  it.only('signs up a user successfully', async () => {
    const newToken = await req.post('/api/auth/signup').send(testUser)
    console.log(newToken.body)
        // token = res.body.token;
        // assert.isOk(token);
      });
  }),
    it('checks credentials then retrieves the user', async () => {
      return saveUser(seedPeople[1]).then(person => {
        return req
          .post('/users/signin')
          .send(seedPeople[1])
          .then(res => {
            // console.log(res);
            // assert.equal(seedPeople[1].email, res.body.email)
            // console.log('res: ',res);
          });
      });
    }),
    it('fails if user forgets email or pw', async () => {
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
