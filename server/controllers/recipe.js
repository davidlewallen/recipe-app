const URLParse = require('url-parse');

const Recipe = require('../models/recipe');

const stripWebsite = require('./websiteRules');

const submit = async (req, res) => {
  const parsedURL = URLParse(req.params.recipeURL)
  try {
    let result;
    result = await Recipe.find({ 'url.href': parsedURL.href })

    const exists = !!result.length;

    if (!exists) {
      const recipe = new Recipe({ ...await stripWebsite(parsedURL) });

      result = await recipe.save()
    }
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  submit,
}
