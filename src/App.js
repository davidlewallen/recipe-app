import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      registerUsername: '',
      registerPassword: '',
      loginUsername: '',
      loginPassword: '',
      recipeURL: '',
      recipeList: [],
    }
  }
  register = async (event) => {
    event.preventDefault();
    const body = {
      username: this.state.registerUsername,
      password: this.state.registerPassword,
    }

    try {
      await axios.post('/api/account/register', body);
    } catch (err) {
      console.error(err.config);
    }
  }

  login = async (event) => {
    event.preventDefault();
    const body = {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    };

    const result = await axios.post('/api/account/login', body);
    const recipes = await axios.get('/api/recipe');

    this.setState({ recipeList: recipes.data })
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.recipeURL)
      const { data } = await axios.post(`/api/recipe/submit/${encodedRecipeURI}`)

      this.setState({ recipeList: [...this.state.recipeList, data]})

    } catch (err) {
      console.error(err);
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
      console.log('result', result)
    } catch (err) {
      console.log('err', err);
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

  handleLoginUsername = (event) => {
    const loginUsername = event.target.value;
    this.setState({ loginUsername });
  }

  handleLoginPassword = (event) => {
    const loginPassword = event.target.value;
    this.setState({ loginPassword });
  }

  handleRecipe = (event) => {
    const recipeURL = event.target.value;
    this.setState({ recipeURL })
  }



  render() {
    return (
      <div className="App">
        <form className="register">
          <input
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleRegisterUsername}
          />
          <input
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleRegisterPassword}
          />
          <button onClick={this.register}>Register</button>
        </form>

        <br />

        <form className="login">
          <input
            placeholder="Username"
            value={this.state.loginUsername}
            onChange={this.handleLoginUsername}
          />
          <input
            placeholder="Password"
            value={this.state.loginPassword}
            onChange={this.handleLoginPassword}
          />
          <button onClick={this.login}>Login</button>
        </form>

        <br />

        <form className="submit-recipe">
          <input
            placeholder="Recipe URL"
            value={this.state.recipeURL}
            onChange={this.handleRecipe}
          />
          <button onClick={this.submitRecipe}>Submit</button>
        </form>
        
        <br />

        <button onClick={this.authenticated}>Am I authenticated</button>
        <button onClick={this.userRecipes}>Get User Recipes</button>

        <br />

        {this.state.recipeList.length > 0 && (
          <ul>
            {this.state.recipeList.map((recipe) => <li>{recipe.title}</li>)}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
