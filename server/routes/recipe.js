const express = require('express');
const router = express.Router();

const Recipe = require('../controllers/recipe');

router.post('/submit/:recipeURL', Recipe.submit);

module.exports = router;
