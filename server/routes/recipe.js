const express = require('express');
const router = express.Router();
const URLParse = require('url-parse');

const Recipe = require('../models/recipe');

router.post('/submit/:recipeURL', async (req, res) => {
  const parsedURL = URLParse(req.params.recipeURL)
  try {
    const results = await Recipe.submit(parsedURL);

    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.get('/submit', (req, res) => {
  res.send('/');
})

module.exports = router;
