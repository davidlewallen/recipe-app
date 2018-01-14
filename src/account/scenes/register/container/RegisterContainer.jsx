import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Register from '../components';

import { Account } from '../../../../common/utils/api';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
};

class RegisterContainer extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      error: {
        value: false,
        message: '',
      },
    };
  }

  register = async (event) => {
    event.preventDefault();


    const body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };

    try {
      await Account.register(body);
      this.props.history.replace('/');
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

  handleUsername = (event) => {
    const username = event.target.value;
    this.setState({ username });
  }

  handlePassword = (event) => {
    const password = event.target.value;
    this.setState({ password });
  }

  handleEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  render = () => (
    <Register
      username={this.state.username}
      handleUsername={this.handleUsername}
      password={this.state.password}
      handlePassword={this.handlePassword}
      email={this.state.email}
      handleEmail={this.handleEmail}
      register={this.register}
      error={this.state.error}
    />
  );
}

RegisterContainer.propTypes = propTypes;
export default RegisterContainer;
