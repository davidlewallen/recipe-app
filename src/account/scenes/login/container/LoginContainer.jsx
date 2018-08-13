import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from '../components';

import { Account } from '../../../../common/utils/api';

import '../assets/styles/index.css';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
  updateAuth: func.isRequired,
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

  login = async ({ preventDefault }) => {
    preventDefault();

    try {
      const {
        props: { history, updateAuth },
        state: { username, password },
      } = this;

      await Account.login({
        username,
        password,
      });

      updateAuth(true);

      history.replace('/dashboard');
    } catch (err) {
      const { response } = err;
      if (response.status === 400) {
        this.setState({
          error: {
            value: true,
            message: response.data.message,
          },
        });
      }
    }
  }

  handleUsername = ({ target: { value: username } }) => (
    this.setState({ username: username.trim() })
  );

  handlePassword = ({ target: { value: password } }) => (
    this.setState({ password: password.trim() })
  );

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
