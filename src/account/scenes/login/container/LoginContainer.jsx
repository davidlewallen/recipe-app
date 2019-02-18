import React, { Component } from 'react';
import { shape, func } from 'prop-types';

import Login from '../components';

import { Account } from '../../../../common/utils/api';

import '../assets/styles/index.css';
import UserContext from '../../../../common/context/UserContext';

class LoginContainer extends Component {
  static contextType = UserContext;

  static propTypes = {
    history: shape({ replace: func }).isRequired,
  };

  state = {
    username: '',
    password: '',
    error: {
      value: false,
      message: '',
    },
  };

  login = async event => {
    event.preventDefault();

    const {
      props: { history },
      state: { username, password },
      context: { setUserAuth },
    } = this;

    try {
      await Account.login({
        username,
        password,
      });

      setUserAuth(true);

      history.replace('/dashboard');
    } catch (err) {
      const { response } = err;

      if (response.status === 403 && !response.data.verified) {
        history.replace('/account/verify');
      }

      if (response.status === 400) {
        this.setState({
          error: {
            value: true,
            message: response.data.message,
          },
        });
      }
    }
  };

  handleUsername = ({ target: { value: username } }) =>
    this.setState({ username: username.trim() });

  handlePassword = ({ target: { value: password } }) =>
    this.setState({ password: password.trim() });

  render = () => {
    const { username, password, error } = this.state;

    return (
      <Login
        username={username}
        handleUsername={this.handleUsername}
        password={password}
        handlePassword={this.handlePassword}
        error={error}
        login={this.login}
      />
    );
  };
}

export default LoginContainer;
