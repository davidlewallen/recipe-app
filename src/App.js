import React, { Component } from 'react';

import axios from 'axios';

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
      recipeURL: '',
      recipeList: [],
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
    }

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
    };

    await axios.post('/api/account/login', body);
    const recipes = await axios.get('/api/recipe');

    this.setState({ recipeList: recipes.data })
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.recipeURL)
      const { data } = await axios.post(`/api/recipe/submit/${encodedRecipeURI}`)

      if (data.alreadyAdded === false) {
        this.setState({ recipeList: [...this.state.recipeList, data] })
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
      console.log('result', result)
    } catch (err) {
      console.log('err', err);
    }
  }

  deleteRecipe = async (recipeId) => {
    try {
      const result = await axios.delete(`/api/recipe/delete/${recipeId}`)
      this.setState({ recipeList: result.data })
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
            value={this.state.registerUsername}
            onChange={this.handleRegisterUsername}
          />
          <input
            placeholder="Password"
            value={this.state.registerPassword}
            onChange={this.handleRegisterPassword}
          />
          <input
            placeholder="First Name"
            value={this.state.registerFirstName}
            onChange={this.handleRegisterFirstName}
          />
          <input
            placeholder="Last Name"
            value={this.state.registerLastName}
            onChange={this.handleRegisterLastName}
          />
          <input
            placeholder="Email Address"
            value={this.state.registerEmail}
            onChange={this.handleRegisterEmail}
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
            {this.state.recipeList.map((recipe) => (
              <div>
                <li>{recipe.title}</li>
                <button onClick={() => this.deleteRecipe(recipe._id)}>Delete</button>
              </div>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
