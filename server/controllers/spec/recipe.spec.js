const mongoose = require('mongoose');

// Set up mongo connection
require('../../db');

const Recipe = require('../recipe');

const RecipeModel = require('../../models/recipe');
const AccountModel = require('../../models/account');

describe('Recipe Controller Test', () => {
  let user = null;

  beforeEach(async (done) => {
    // Clean collections
    await AccountModel.remove({});
    await RecipeModel.remove({});

    // Create a new user
    AccountModel.register(
      new AccountModel({
        username: 'test',
        info: {
          firstName: 'test',
          lastName: 'test',
          email: 'test',
        },
      }),
      new Buffer('test'),
      (err, createdUser) => {
        user = createdUser;
        done();
      }
    );
  })

  afterAll(() => {
    mongoose.connection.close();
  })

  describe('Recipe.submit', () => {
    it('should submit a recipe when recipe doesnt exist', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      await Recipe.submit(url, user._id);

      const result = await RecipeModel.find({});

      expect(result.length).toEqual(1);
    });

    it('should return recipe in database when submitting a saved recipe', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';

      await Recipe.submit(url, user._id);
      await Recipe.submit(url, user._id);

      const result = await RecipeModel.find({});

      expect(result.length).toEqual(1);
    });

    it('should return noneProcessable if url is not processable', async () => {
      const url = 'http://http://www.seriouseats.com/recipes/2017/12/braised-chicken-aji-amarillo-coconut-milk-recipe.html/';

      const result = await Recipe.submit(url, user._id);

      expect(result.noneProcessable).toEqual(true);
    });

    it('should add recipe id to account.savedRecipes array', async () => {
      const url = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';
      const recipe = await Recipe.submit(url, user._id);
      const recipeId = recipe._id;

      const result = await AccountModel.findById(user._id);
      
      expect(result.savedRecipes[0]).toEqual(recipeId);
    })
  })

  describe('Recipe.get', () => {
    it('should get recipes that a user has submitted', async () => {
      const url1 = 'http://allrecipes.com/recipe/24002/famous-butter-chicken/';
      const url2 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      
      await Recipe.submit(url1, user._id)
      await Recipe.submit(url2, user._id);

      const result = await Recipe.get(user._id);
      expect(result.length).toEqual(2);
    })
  })

  describe('Recipe.remove', () => {
    it('should remove a recipe from user\'s savedRecipes and return a list of saved recipes', async () => {
      const url1 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      const url2 = 'http://allrecipes.com/recipe/219164/the-best-parmesan-chicken-bake';

      const submitResult1 = await Recipe.submit(url1, user._id);
      const submitResult2 = await Recipe.submit(url2, user._id);
      const accountBeforeRemove = await AccountModel.findById(user._id);
      expect(accountBeforeRemove.savedRecipes.length).toBe(2);

      await Recipe.remove(submitResult1._id, user._id);
      const accountAfterRemove = await AccountModel.findById(user._id);
      expect(accountAfterRemove.savedRecipes.length).toBe(1);

      expect(accountAfterRemove.savedRecipes[0]).toEqual(submitResult2._id);
    });

    it('should return all savedRecipes when removing a recipe that doesnt exist', async () => {
      const url1 = 'http://allrecipes.com/recipe/8652/garlic-chicken/';
      const url2 = 'http://allrecipes.com/recipe/219164/the-best-parmesan-chicken-bake';

      const submitRecipe1 = await Recipe.submit(url1, user._id);
      const submitRecipe2 = await Recipe.submit(url2, user._id);

      const accountBeforeRemove = await AccountModel.findById(user._id);
      expect(accountBeforeRemove.savedRecipes.length).toEqual(2);

      await Recipe.remove(submitRecipe2._id, user._id);
      const accountAfterRemove = await AccountModel.findById(user._id);
      expect(accountAfterRemove.savedRecipes.length).toEqual(1);

      await Recipe.remove(submitRecipe2._id, user._id);
      const accountAfterRemove2 = await AccountModel.findById(user._id);
      expect(accountAfterRemove2.savedRecipes.length).toEqual(1);
      expect(accountAfterRemove2.savedRecipes[0]).toEqual(submitRecipe1._id);
    })
  });

  describe('Recipe.getSavedRecipes', () => {
    it('should get saved recipes for a user', async () => {
      const url = 'http://allrecipes.com/recipe/8652/garlic-chicken/';

      let savedRecipes = await Recipe.getSavedRecipes(user._id);
      expect(savedRecipes.length).toEqual(0);

      await Recipe.submit(url, user._id);

      savedRecipes = await Recipe.getSavedRecipes(user._id);
      expect(savedRecipes.length).toEqual(1);
    })
  })

  describe('Recipe.saveRecipeToUser', () => {
    it('should save a recipe id to a user', async () => {
      const recipeId = mongoose.Types.ObjectId('5a49114ce29c498c45d1773b');

      let result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toEqual(0);
      
      await Recipe.saveRecipeToUser(recipeId, user._id);
      result = await AccountModel.findById(user._id);
      expect(result.savedRecipes.length).toEqual(1);
      expect(result.savedRecipes[0]).toEqual(recipeId);
    })
  })
})