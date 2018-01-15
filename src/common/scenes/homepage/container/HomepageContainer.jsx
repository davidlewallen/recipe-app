import React from 'react';
import PropTypes from 'prop-types';

import Homepage from '../components';

import { Recipe, Account } from '../../../utils/api';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        url: '',
        list: [],
      },
    };
  }

  componentWillMount = async () => {
    await this.initialize();
  }

  getUserRecipes = async () => {
    const { data: recipes } = await Recipe.getRecipes();

    await this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        list: recipes,
      },
    }));
  }

  checkIsAuth = async () => {
    try {
      const { data } = await Account.auth();

      if (data.isAuth === false) {
        this.props.history.replace('/account/login');
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  initialize = async () => {
    await this.checkIsAuth();
    await this.getUserRecipes();
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.recipe.url);
      const { data } = await Recipe.submitRecipe(encodedRecipeURI);

      if (!data.alreadyAdded) {
        this.setState(prevState => ({
          recipe: {
            ...prevState.recipe,
            list: [...this.state.recipe.list, data],
          },
        }));
      }
    } catch (err) {
      console.error(err.response);

      if (err && err.response && err.response.status === 403) {
        alert('We cant process this website currently');
      }
    }
  }

  deleteRecipe = async (recipeId) => {
    try {
      const { data: recipes } = await Recipe.deleteRecipe(recipeId);

      this.setState(prevState => ({
        recipe: {
          ...prevState.recipe,
          list: recipes,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  }

  handleRecipe = (event) => {
    const url = event.target.value;
    this.setState(prevState => ({
      recipe: {
        ...prevState.recipe,
        url,
      },
    }));
  }


  render = () => (
    <Homepage
      recipeURL={this.state.recipe.url}
      recipeList={this.state.recipe.list}
      handleRecipe={this.handleRecipe}
      submitRecipe={this.submitRecipe}
      deleteRecipe={this.deleteRecipe}
    />
  );
}

App.propTypes = propTypes;

export default App;
