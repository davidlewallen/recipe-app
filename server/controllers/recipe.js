const URLParse = require('url-parse');

const Recipe = require('../models/recipe');
const Account = require('../models/account');

const stripWebsite = require('./websiteRules');

const get = async (req, res) => {
  const userId = req.user._id;

  try {
    const savedRecipeResult = await getUserSavedRecipes(userId);
    const savedRecipeList = savedRecipeResult[0].savedRecipes;

    const listOfRecipes = await getListOfRecipes(savedRecipeList);
    res.json(listOfRecipes);
  } catch (err) {
    res.send(err, 500);
  }
}

const getUserSavedRecipes = async (userId) => {
  const result = await Account.find({ _id: userId }, 'savedRecipes');
  return result;
}

const getListOfRecipes = async (listOfRecipeId) => {
  const result = await Recipe.find({ _id: { $in: listOfRecipeId }});
  return result;
}

const submit = async (req, res) => {
  const parsedURL = URLParse(req.params.recipeURL)
  const userId = req.user._id;
  
  try {
    // Check to see if recipe is already in recipe collection
    let result = await Recipe.find({ 'url.href': parsedURL.href })
    const exists = !!result.length;

    // If recipe doesnt already exist, strip website and save to recipe
    if (!exists) {
      const recipe = new Recipe({ ...await stripWebsite(parsedURL) });
      result = await recipe.save()
    }

    // If result is an array target index 0 and grab _id
    // If result is an object target ._id
    const recipeId = Array.isArray(result) ? result[0]._id : result._id;
    await saveRecipeToUser(recipeId, userId);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.send(err, 500);
  }
};

const saveRecipeToUser = async (recipeId, userId) => {
  const result = await Account.find({ savedRecipes: recipeId});
  const isRecipeSaved = !!result.length;

  // If user hasnt saved the recipe, add it to account.savedRecipe
  if (!isRecipeSaved) {
    await Account.findByIdAndUpdate(
      userId,
      { $push: { savedRecipes: recipeId } },
      { new: true },
    );
  }
}

module.exports = {
  submit,
  get,
}
