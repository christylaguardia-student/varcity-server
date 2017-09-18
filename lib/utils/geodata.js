const superagent = require('superagent');

const API_URL = 'https://geodata.solutions/restapi';

module.exports = {
  getCountries() {
    return superagent
      .get(`${API_URL}?country`)
      .then(res => {
        const results = JSON.parse(res.text);
        const keys = Object.keys(results).filter(k => k !== 'appendix');
        const countries = keys.map(key => results[key].country_name);
        return countries;
      });
  },

  getStates(country) {
    return superagent
      .get(`${API_URL}?country=${country}`)
      .then(res => {
        const results = JSON.parse(res.text);
        const states = results.details.regionalBlocs.map(r => r.state_name);
        return states;
      });
  },
  
  getCities(country, state) {
    return superagent
      .get(`${API_URL}?country=${country}&state=${state}`)
      .then(res => {
        const results = JSON.parse(res.text);
        const keys = Object.keys(results).filter(k => k !== 'appendix');
        const cities = keys.map(key => results[key].city_name);
        return cities;
      });
  }
};
