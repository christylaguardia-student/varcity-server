const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Sandbox = require('../models/Sandbox.js');

router
  .get('/sandbox', async (req, res, next) => {
  })
  .post('/sandbox', async (req, res, next) => {
    const {value} = req.query
    const sandbox = new Sandbox({value: value});
    const updatedText = await sandbox.update()
    res.send(updatedText)
  })
  .use(jsonParser);

module.exports = router;