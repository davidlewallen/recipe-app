const express = require('express');
const router = express.Router();

router.use('/recipe', require('./recipe'));
router.use('/account', require('./account'));

module.exports = router;
