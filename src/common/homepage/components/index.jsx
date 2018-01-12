import React from 'react';
import PropTypes from 'prop-types';

const {
  string, func, arrayOf, object,
} = PropTypes;
const propTypes = {
  registerUsername: string.isRequired,
  handleRegisterUsername: func.isRequired,
  registerPassword: string.isRequired,
  handleRegisterPassword: func.isRequired,
  registerFirstName: string.isRequired,
  handleRegisterFirstName: func.isRequired,
  registerLastName: string.isRequired,
  handleRegisterLastName: func.isRequired,
  registerEmail: string.isRequired,
  handleRegisterEmail: func.isRequired,
  loginUsername: string.isRequired,
  handleLoginUsername: func.isRequired,
  loginPassword: string.isRequired,
  handleLoginPassword: func.isRequired,
  loginPhrase: string.isRequired,
  handleLoginPhrase: func.isRequired,
  register: func.isRequired,
  login: func.isRequired,
  recipeURL: string.isRequired,
  handleRecipe: func.isRequired,
  submitRecipe: func.isRequired,
  authenticated: func.isRequired,
  userRecipes: func.isRequired,
  recipeList: arrayOf(object).isRequired,
};

const Homepage = props => (
  <div>
    <form className="register">
      <input
        placeholder="Username"
        value={props.registerUsername}
        onChange={props.handleRegisterUsername}
      />
      <input
        placeholder="Password"
        value={props.registerPassword}
        onChange={props.handleRegisterPassword}
      />
      <input
        placeholder="First Name"
        value={props.registerFirstName}
        onChange={props.handleRegisterFirstName}
      />
      <input
        placeholder="Last Name"
        value={props.registerLastName}
        onChange={props.handleRegisterLastName}
      />
      <input
        placeholder="Email Address"
        value={props.registerEmail}
        onChange={props.handleRegisterEmail}
      />
      <button onClick={props.register}>Register</button>
    </form>

    <br />

    <form className="login">
      <input
        placeholder="Username"
        value={props.loginUsername}
        onChange={props.handleLoginUsername}
      />
      <input
        placeholder="Password"
        value={props.loginPassword}
        onChange={props.handleLoginPassword}
      />
      <input
        placeholder="Phrase"
        value={props.loginPhrase}
        onChange={props.handleLoginPhrase}
      />
      <button onClick={props.login}>Login</button>
    </form>

    <br />

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
