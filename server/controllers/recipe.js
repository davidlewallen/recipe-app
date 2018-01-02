const URLParse = require('url-parse');

const Recipe = require('../models/recipe');
const Account = require('../models/account');

const { stripWebsite, isWebsiteProcessable } = require('./websiteRules');

const get = async (userId) => {
  try {
    return await getSavedRecipes(userId);
  } catch (err) {
    console.log('err', err);
  }
}

const getSavedRecipes = async (userId) => {
  try {
    const savedRecipeResult = await Account.findById(userId, 'savedRecipes')
    const recipeIds = savedRecipeResult.savedRecipes;

    return await Recipe.find({ _id: { $in: recipeIds } });
  } catch (err) {
    console.log('err', err);
  }
}

const submit = async (recipeURL, userId) => {
  const parsedURL = URLParse(recipeURL)

  try {
    // Check to see if we can process the provide website
    if (isWebsiteProcessable(parsedURL)) {
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

      return result;
    }

    return { noneProcessable: true };
  } catch (err) {
    console.log('err', err);
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

const remove = async (recipeId, userId) => {
  try {
    const savedRecipeResult = await Account.find({ savedRecipes: recipeId });
    const exists = !!savedRecipeResult.length;

    if (exists) {
      await Account.findByIdAndUpdate(userId, {
        $pull: {
          savedRecipes: recipeId,
        }
      })
    }

    return await getSavedRecipes(userId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  submit,
  get,
  remove,
  getSavedRecipes,
  saveRecipeToUser,
}
