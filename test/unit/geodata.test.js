const { assert } = require('chai');
const { getCountries, getStates, getCities } = require('../../lib/utils/geodata');

// Note: es6 arrow functions don't work with this.timeout

describe.only('geodata api service', function() {
  this.timeout(5000);
  
  describe('countries', function() {
    it('returns all countries', function() {
      return getCountries()
        .then(countries => assert.isAbove(countries.length, 0));
    });
  });
  
  describe('states', function() {
    it('returns states for a country', function() {
      return getStates('Japan')
        .then(states => assert.isAbove(states.length, 0));
    });
    
      it('returns empty array when no states are found', function() {
        return getStates('bad country name')
          .then(states => assert.equal(states.length, 0));
      });
    
  });

  describe('cities', function() {
    it('returns all cites for a state', function() {
      return getCities('Japan', 'Miyagi')
        .then(cities => assert.isAbove(cities.length, 0));
    });
  
    it('returns empty array when no cites are found', function() {
      return getCities('bad country name', 'bad state or region name')
        .then(cities => assert.equal(cities.length, 0));
    });
  });
  
});