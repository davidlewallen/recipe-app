const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('./utils');

router.use('/recipe', require('./recipe'));
router.use('/account', require('./account'));

router.get('/auth', isAuthenticated, (req, res) => {
  res.send(true);
});

router.get('*', (req, res) => {
  res.status(404).send('Endpoint Not Found');
});

module.exports = router;
