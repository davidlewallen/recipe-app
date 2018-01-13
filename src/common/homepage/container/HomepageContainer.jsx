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
      register: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
      },
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

  register = async (event) => {
    event.preventDefault();

    const { register } = this.state;

    const body = {
      username: register.username,
      password: register.password,
      firstName: register.firstname,
      lastName: register.lastname,
      email: register.email,
    };

    try {
      await axios.post('/api/account/register', body);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.recipe.url);
      const { data } = await axios.post(`/api/recipe/submit/${encodedRecipeURI}`);

      if (data.alreadyAdded === false) {
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

  authenticated = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.get('/api/account/testProtectedRoute');
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  userRecipes = async () => {
    try {
      const result = await axios.get('/api/recipe');
      console.log('result', result);
    } catch (err) {
      console.log('err', err);
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
  handleRegisterUsername = (event) => {
    const username = event.target.value;
    this.setState(prevState => ({
      register: {
        ...prevState.register,
        username,
      },
    }));
  }

  handleRegisterPassword = (event) => {
    const password = event.target.value;
    this.setState(prevState => ({
      register: {
        ...prevState.register,
        password,
      },
    }));
  }

  handleRegisterFirstName = (event) => {
    const firstname = event.target.value;
    this.setState(prevState => ({
      register: {
        ...prevState.register,
        firstname,
      },
    }));
  }

  handleRegisterLastName = (event) => {
    const lastname = event.target.value;
    this.setState(prevState => ({
      register: {
        ...prevState.register,
        lastname,
      },
    }));
  }

  handleRegisterEmail = (event) => {
    const email = event.target.value;
    this.setState(prevState => ({
      register: {
        ...prevState.register,
        email,
      },
    }));
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
      registerUsername={this.state.register.username}
      registerPassword={this.state.register.password}
      registerFirstName={this.state.register.firstname}
      registerLastName={this.state.register.lastname}
      registerEmail={this.state.register.email}
      recipeURL={this.state.recipe.url}
      recipeList={this.state.recipe.list}
      handleRegisterUsername={this.handleRegisterUsername}
      handleRegisterPassword={this.handleRegisterPassword}
      handleRegisterFirstName={this.handleRegisterFirstName}
      handleRegisterLastName={this.handleRegisterLastName}
      handleRegisterEmail={this.handleRegisterEmail}
      handleLoginUsername={this.handleLoginUsername}
      handleLoginPassword={this.handleLoginPassword}
      handleLoginPhrase={this.handleLoginPhrase}
      handleRecipe={this.handleRecipe}
      register={this.register}
      submitRecipe={this.submitRecipe}
      authenticated={this.authenticated}
      userRecipes={this.userRecipes}
    />
  );
}

App.propTypes = propTypes;

export default App;
