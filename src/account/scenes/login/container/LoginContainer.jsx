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
      error: false,
    };
  }

  login = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = this.state;

      const body = { username, password };

      const result = await axios.post('/api/account/login', body);

      if (result.status === 200) {
        this.props.history.replace('/');
      }
    } catch (err) {
      const { response } = err;
      if (response.status === 400 || response.status === 401) {
        this.clearFields();
        this.setState({ error: true });
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

  clearFields = () => {
    this.setState({ username: '', password: '' });
  }

  render = () => (
    <Login
      username={this.state.username}
      handleUsername={this.handleUsername}
      password={this.state.password}
      handlePassword={this.handlePassword}
      error={this.state.error}
      login={this.login}
    />
  )
}

LoginContainer.propTypes = propTypes;
export default LoginContainer;
