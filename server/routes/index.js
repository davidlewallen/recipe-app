const express = require('express');
const router = express.Router();

const listOfApprovedWebsites = require('./utils/listOfApprovedWebsites.js');

router.use('/recipe', require('./recipe'));
router.use('/account', require('./account'));

router.get('/approved', (req, res) => {
  res.json(listOfApprovedWebsites());
});

router.get('*', (req, res) => {
  res.status(404).send('Endpoint Not Found');
});


module.exports = router;
