import React from 'react';
import PropTypes from 'prop-types';

const {
  string, func, arrayOf, object,
} = PropTypes;
const propTypes = {
  recipeURL: string.isRequired,
  handleRecipe: func.isRequired,
  submitRecipe: func.isRequired,
  authenticated: func.isRequired,
  userRecipes: func.isRequired,
  recipeList: arrayOf(object).isRequired,
};

const Homepage = props => (
  <div>
    <form className="submit-recipe">
      <input
        placeholder="Recipe URL"
        value={props.recipeURL}
        onChange={props.handleRecipe}
      />
      <button onClick={props.submitRecipe}>Submit</button>
    </form>

    <br />

    <button onClick={props.authenticated}>Am I authenticated</button>
    <button onClick={props.userRecipes}>Get User Recipes</button>

    <br />

    {props.recipeList.length > 0 && (
      <ul>
        {props.recipeList.map(recipe => (
          <div>
            <li>{recipe.title}</li>
            <button onClick={() => props.deleteRecipe(recipe._id)}>Delete</button>
          </div>
        ))}
      </ul>
    )}
  </div>
);

Homepage.propTypes = propTypes;
export default Homepage;
