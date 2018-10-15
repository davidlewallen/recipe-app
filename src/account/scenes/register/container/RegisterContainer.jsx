import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import get from 'lodash/get';

import Register from '../components';

import { Account } from '../../../../common/utils/api';

class RegisterContainer extends Component {
  static propTypes = { history: shape({ replace: func }).isRequired };

  state = {
    password: '',
    passwordConf: '',
    email: '',
    error: {
      value: false,
      message: '',
    },
  };

  register = async event => {
    event.preventDefault();

    const {
      props: { history },
      state: { password, email },
    } = this;

    const body = {
      password,
      email,
    };

    try {
      this.validatePassword();

      await Account.register(body);

      history.replace('/account/verify');
    } catch (err) {
      if (err.message) {
        this.setState({
          error: {
            value: true,
            message: err.message,
          },
        });
      }

      if (
        get(err, 'response.status') === 409 ||
        get(err, 'response.status') === 400
      ) {
        this.setState({
          error: {
            value: true,
            message: err.response.data.message,
          },
        });
      }
    }
  };

  validatePassword = () => {
    const { password, passwordConf } = this.state;

    const isEqual = password === passwordConf;

    if (!isEqual && password) {
      throw new Error('Passwords must match.');
    }
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  render = () => {
    const { password, passwordConf, email, error } = this.state;

    return (
      <Register
        password={password}
        passwordConf={passwordConf}
        email={email}
        register={this.register}
        error={error}
        handleInputChange={this.handleInputChange}
      />
    );
  };
}

export default RegisterContainer;
