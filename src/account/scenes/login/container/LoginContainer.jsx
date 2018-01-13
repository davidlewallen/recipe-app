import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Login from '../components';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
};

class LoginContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }

  login = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = this.state;

      if (username || password) {
        const body = { username, password };

        const result = await axios.post('/api/account/login', body);

        if (result.status === 200) {
          this.props.history.replace('/');
        }
      } else {
        // do something here to validate fields
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log('Account doesnt exist');
      }
    }
  }

  handleUsername = (event) => {
    const username = event.target.value;
    this.setState({ username });
  }

  handlePassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  }

  render = () => (
    <Login
      username={this.state.username}
      handleUsername={this.handleUsername}
      password={this.state.password}
      handlePassword={this.handlePassword}
      login={this.login}
    />
  )
}

LoginContainer.propTypes = propTypes;
export default LoginContainer;
