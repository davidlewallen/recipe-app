const express = require('express');
const router = express.Router();


router.use('/recipe', require('./recipe'));
router.use('/account', require('./account'));

router.get('*', (req, res) => {
  res.status(404).send('Endpoint Not Found');
});

module.exports = router;
