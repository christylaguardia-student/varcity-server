const request = require('./_request');
const { assert } = require('chai');
const db = require('./_db');

describe('edu REST api', () => {
  before(db.drop);

  // let token = null;

  let stanislaus = {
    institution: 'stanislaus',
    year: '2017-04-30',
    address: {
      country: 'USA',
      city: 'Philadelphia',
      state: 'Pennsylvania'
    },
    degree: 'Undergraduate Degree',
    testScores:{
      SAT: {
        reading: 540,
        math: 680,
        writing: 600
      }
    }
  };

  let chaplin = {
    institution: 'chaplin',
    year: '2017-04-30',
    address: {
      country: 'USA',
      city: 'Philadelphia',
      state: 'Pennsylvania'
    },
    degree: 'Undergraduate Degree',
    testScores:{
      SAT: {
        reading: 640,
        math: 580,
        writing: 700
      }
    }
  };

  function saveInstitution(edu) {
    return request
      .post('/edu')
    // .set('Authorization', token)
      .send(edu)
      .then(res => res.body);
  }

  it('saves an institution', () => {
    return saveInstitution(chaplin)
      .then(saved => {
        assert.ok(saved._id);
        // assert.equal(saved.institution, chaplin.institution);
        chaplin = saved;
      })
      .then(() => {
        return request.get(`/edu/${chaplin._id}`);
      })
      .then(res => res.body)
      .then(get => {
        assert.deepEqual(get, chaplin);
      });
  });

  it('returns 404 if institution does not exist', () => {
    return request.get('/edu/58ff9f496aafd447254c29b5')
      // .set('Authorization', token)
      .then(
        () => {
          //resolve
          throw new Error('successful status code not expected');
        },
        ({ response }) => {
          assert.ok(response.notFound);
          assert.isOk(response.error);
        }
      );
  });

  it('GET all institutions', () => {
    return Promise.all([
      saveInstitution(chaplin),
      saveInstitution(stanislaus)
    ])
      .then(() => { 
        request.get('/edu')
        // .set('Authorization', token))
          .then(res => {
            const institutions = res.body;
            assert.deepEqual(institutions, [chaplin, stanislaus]);
          });
      });
  });

  it('rewrites institution data by id', ()=>{
    return request.put(`/institutions/${chaplin._id}`)
      // .set('Authorization', token)
      .send(stanislaus)
      .then(res => {
        assert.isOk(res.body._id);
        assert.equal(res.body.name,stanislaus.name);
        assert.equal(res.body.degree,stanislaus.degree);
      });
  });

  it('deletes institution by id', () =>{
    return request.delete(`/edu/${stanislaus._id}`)
      // .set('Authorization', token)
      .then(res => {
        assert.deepEqual(JSON.parse(res.text), { removed: true });
      });
  });

  it('fails to delete institution by id', () => {
    return request.delete(`/edu/${stanislaus._id}`)
      // .set('Authorization', token)
      .then(res => {
        assert.deepEqual(JSON.parse(res.text), { removed: false });
      });
  });        
});