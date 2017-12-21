const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');

router.get('/submit/:recipeURL', async (req, res) => {
  try {
    res.send(await Recipe.submit(req.params.recipeURL));
  } catch (err) {
    res.status(500).send(err);
  }
})

router.get('/submit', (req, res) => {
  res.send('/');
})

module.exports = router;
