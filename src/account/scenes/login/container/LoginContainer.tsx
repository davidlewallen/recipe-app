import * as React from 'react';

import { IPropTypes, IState } from './types';

import { Account } from '../../../../common/utils/api';

import Login from '../components';

import '../assets/styles/index.css';

class LoginContainer extends React.Component<IPropTypes, IState> {
  state = {
    username: '',
    password: '',
    error: {
      value: false,
      message: '',
    },
  };

  login = async (event: Event) => {
    event.preventDefault();

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

  handleUsername = ({ target: { value: username } }: { target: { value: string } }) => (
    this.setState({ username: username.trim() })
  );

  handlePassword = ({ target: { value: password } }: { target: { value: string } }) => (
    this.setState({ password: password.trim() })
  );

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
  }
}

export default LoginContainer;
