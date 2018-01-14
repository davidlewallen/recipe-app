import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Homepage from '../components';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
};

class App extends Component {
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
    const { data: recipes } = await axios.get('/api/recipe');

    await this.setState(prevState => ({ recipe: { ...prevState.recipe, list: recipes } }));
  }

  checkIsAuth = async () => {
    const { data } = await axios.get('/api/account/auth');

    if (data.isAuth === false) {
      this.props.history.replace('/account/login');
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
      const { data } = await axios.post(`/api/recipe/submit/${encodedRecipeURI}`);

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
      const { data: recipes } = await axios.delete(`/api/recipe/delete/${recipeId}`);
      this.setState(prevState => ({
        recipe: {
          ...prevState.recipe,
          list: [...this.state.recipe.list, ...recipes],
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
    />
  );
}

App.propTypes = propTypes;

export default App;
