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
      login: {
        username: '',
        password: '',
        phrase: '',
      },
      recipe: {
        url: '',
        list: [],
      },
    };
  }

  componentWillMount = () => {
    this.checkIsAuth();
  }

  checkIsAuth = async () => {
    const { data } = await axios.get('/api/account/auth');

    if (data.isAuth === false) {
      this.props.history.replace('/account/login');
    }
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

  login = async (event) => {
    event.preventDefault();

    const { login } = this.state;

    const body = {
      username: login.username,
      password: login.password,
      lockdownPhrase: login.phrase,
    };

    const { data } = await axios.post('/api/account/login', body);

    if (!data.lockdownPhraseMissing) {
      const { data: recipes } = await axios.get('/api/recipe');

      await this.setState(prevState => ({ recipe: { ...prevState.recipe, list: recipes } }));
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

  handleLoginUsername = (event) => {
    const username = event.target.value;
    this.setState(prevState => ({
      login: {
        ...prevState.login,
        username,
      },
    }));
  }

  handleLoginPassword = (event) => {
    const password = event.target.value;
    this.setState(prevState => ({
      login: {
        ...prevState.login,
        password,
      },
    }));
  }

  handleLoginPhrase = (event) => {
    const phrase = event.target.value;
    this.setState(prevState => ({
      login: {
        ...prevState.login,
        phrase,
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
      loginUsername={this.state.login.username}
      loginPassword={this.state.login.password}
      loginPhrase={this.state.login.phrase}
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
      login={this.login}
      submitRecipe={this.submitRecipe}
      authenticated={this.authenticated}
      userRecipes={this.userRecipes}
    />
  );
}

App.propTypes = propTypes;

export default App;
