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
      registerUsername: '',
      registerPassword: '',
      registerFirstName: '',
      registerLastName: '',
      registerEmail: '',
      loginUsername: '',
      loginPassword: '',
      loginPhrase: '',
      recipeURL: '',
      recipeList: [],
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
    const body = {
      username: this.state.registerUsername,
      password: this.state.registerPassword,
      firstName: this.state.registerFirstName,
      lastName: this.state.registerLastName,
      email: this.state.registerEmail,
    };

    try {
      await axios.post('/api/account/register', body);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  login = async (event) => {
    event.preventDefault();
    const body = {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
      lockdownPhrase: this.state.loginPhrase,
    };

    const { data } = await axios.post('/api/account/login', body);

    if (!data.lockdownPhraseMissing) {
      const recipes = await axios.get('/api/recipe');

      this.setState({ recipeList: recipes.data });
    }
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.recipeURL);
      const { data } = await axios.post(`/api/recipe/submit/${encodedRecipeURI}`);

      if (data.alreadyAdded === false) {
        this.setState({ recipeList: [...this.state.recipeList, data] });
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
      const result = await axios.delete(`/api/recipe/delete/${recipeId}`);
      this.setState({ recipeList: result.data });
    } catch (err) {
      console.log(err);
    }
  }
  handleRegisterUsername = (event) => {
    const registerUsername = event.target.value;
    this.setState({ registerUsername });
  }

  handleRegisterPassword = (event) => {
    const registerPassword = event.target.value;
    this.setState({ registerPassword });
  }

  handleRegisterFirstName = (event) => {
    const registerFirstName = event.target.value;
    this.setState({ registerFirstName });
  }

  handleRegisterLastName = (event) => {
    const registerLastName = event.target.value;
    this.setState({ registerLastName });
  }

  handleRegisterEmail = (event) => {
    const registerEmail = event.target.value;
    this.setState({ registerEmail });
  }

  handleLoginUsername = (event) => {
    const loginUsername = event.target.value;
    this.setState({ loginUsername });
  }

  handleLoginPassword = (event) => {
    const loginPassword = event.target.value;
    this.setState({ loginPassword });
  }

  handleLoginPhrase = (event) => {
    const loginPhrase = event.target.value;
    this.setState({ loginPhrase });
  }

  handleRecipe = (event) => {
    const recipeURL = event.target.value;
    this.setState({ recipeURL });
  }


  render = () => (
    <Homepage
      registerUsername={this.state.registerUsername}
      registerPassword={this.state.registerPassword}
      registerFirstName={this.state.registerFirstName}
      registerLastName={this.state.registerLastName}
      registerEmail={this.state.registerEmail}
      loginUsername={this.state.loginUsername}
      loginPassword={this.state.loginPassword}
      recipeURL={this.state.recipeURL}
      recipeList={this.state.recipeList}
      handleRegisterUsername={this.handleRegisterUsername}
      handleRegisterPassword={this.handleRegisterPassword}
      handleRegisterFirstName={this.handleRegisterFirstName}
      handleRegisterLastName={this.handleRegisterLastName}
      handleRegisterEmail={this.handleRegisterEmail}
      handleLoginUsername={this.handleLoginUsername}
      handleLoginPassword={this.handleLoginPassword}
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
