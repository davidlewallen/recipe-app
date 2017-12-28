const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('./utils');

const Recipe = require('../controllers/recipe');

router.use(isAuthenticated);

router.get('/', Recipe.get);

router.post('/submit/:recipeURL',  Recipe.submit);

router.delete('/delete/:recipeId', Recipe.remove);

module.exports = router;
