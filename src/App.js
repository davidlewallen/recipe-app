import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  register = (event) => {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password,
    }

    axios.post('/api/account/register', body);
  }

  handleUsername = (event) => {
    const username = event.target.value;
    this.setState({ username });
  }

  handlePassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br />
        <form>
          <input
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUsername}
          />
          <input
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePassword}
          />
          <button onClick={this.register}>Register</button>
        </form>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
