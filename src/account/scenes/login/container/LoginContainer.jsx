import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from '../components';

import { Account } from '../../../../common/utils/api';

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
      error: {
        value: false,
        message: '',
      },
    };
  }

  login = async (event) => {
    event.preventDefault();

    try {
      const { username, password } = this.state;

      const body = { username, password };

      await Account.login(body);
      this.props.history.replace('/dashboard');
    } catch (err) {
      const { response } = err;
      if (response.status === 400) {
        this.clearFields();
        this.setState({
          error: {
            value: true,
            message: response.data.message,
          },
        });
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
