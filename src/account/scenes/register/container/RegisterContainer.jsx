import React, { Component } from 'react';
import { shape, func } from 'prop-types';

import Register from '../components';

import { Account } from '../../../../common/utils/api';

class RegisterContainer extends Component {
  static propTypes = { history: shape({ replace: func }).isRequired }

  state = {
    username: '',
    password: '',
    email: '',
    error: {
      value: false,
      message: '',
    },
  };

  register = async (event) => {
    event.preventDefault();

    const {
      props: { history },
      state: { username, password, email },
    } = this;

    const body = {
      username,
      password,
      email,
    };

    try {
      await Account.register(body);

      history.replace('/account/verify');
    } catch (err) {
      if (err.response.status === 409 || err.response.status === 400) {
        this.setState({
          error: {
            value: true,
            message: err.response.data.message,
          },
        });
      }
    }
  }

  handleUsername = ({ target: { value } }) => this.setState({ username: value });

  handlePassword = ({ target: { value } }) => this.setState({ password: value });

  handleEmail = ({ target: { value } }) => this.setState({ email: value });

  render = () => {
    const {
      username, password, email, error,
    } = this.state;

    return (
      <Register
        username={username}
        handleUsername={this.handleUsername}
        password={password}
        handlePassword={this.handlePassword}
        email={email}
        handleEmail={this.handleEmail}
        register={this.register}
        error={error}
      />
    );
  }
}

export default RegisterContainer;
