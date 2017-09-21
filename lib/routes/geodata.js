const express = require('express');
const router = express.Router();
const { getCountries, getStates, getCities } = require('../utils/geodata');

router
  .get('/countries', (req, res, next) => {
    getCountries()
      .then(countries => res.send(countries))
      .catch(next)
  })

  .get('/regions', (req, res, next) => {
    getStates(req.query.country)
      .then(states => res.send(states))
      .catch(next)
  })

  .get('/cities', (req, res, next) => {
    getCities(req.query.country, req.query.region)
      .then(cities => res.send(cities))
      .catch(next)
  });

module.exports = router;
