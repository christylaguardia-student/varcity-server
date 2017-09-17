const express = require('express');
const router = express.Router();
const { getCountries, getStates, getCities } = require('../utils/geodata');

router
  .get('/countries', (req, res, next) => {
    getCountries()
      .then(countries => res.send(countries))
      .catch(next)
  })

  .get('/states', (req, res, next) => {
    getStates(req.params.country)
      .then(states => res.send(states))
      .catch(next)
  })

  .get('/cities', (req, res, next) => {
    getStates(req.params.country, req.params.state)
      .then(cities => res.send(cities))
      .catch(next)
  });

module.exports = router;
