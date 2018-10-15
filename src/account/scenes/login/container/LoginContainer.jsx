import React, { Component } from 'react';
import { shape, func } from 'prop-types';

import Login from '../components';

import { Account } from '../../../../common/utils/api';

import '../assets/styles/index.css';

class LoginContainer extends Component {
  static propTypes = {
    history: shape({ replace: func }).isRequired,
    updateAuth: func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: {
      value: false,
      message: '',
    },
  };

  login = async event => {
    event.preventDefault();
    const {
      props: { history, updateAuth },
      state: { email, password },
    } = this;

    try {
      await Account.login({
        email,
        password,
      });

      updateAuth(true);

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

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render = () => {
    const { email, password, error } = this.state;

    return (
      <Login
        email={email}
        password={password}
        error={error}
        login={this.login}
        handleInputChange={this.handleInputChange}
      />
    );
  };
}

export default LoginContainer;
