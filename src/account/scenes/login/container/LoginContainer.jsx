import React, { useState, useContext } from 'react';
import { shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Account } from '../../../../common/utils/api';

import '../assets/styles/index.css';
import UserContext from '../../../../common/context/UserContext';

const propTypes = { history: shape({ replace: func.isRequired }).isRequired };

const Login = ({ history }) => {
  const { setUserAuth } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ value: false, message: '' });

  const updateError = ({ value, message }) =>
    setError({ ...error, ...value, ...message });

  const handleLogin = async event => {
    event.preventDefault();

    try {
      await Account.login({ username, password });

      setUserAuth(true);

      history.replace('/dashboard');
    } catch (err) {
      const { response } = err;

      if (response.status === 403 && !response.data.verified) {
        history.replace('/account/verify');
      }

      if (response.status === 400) {
        updateError({ value: true, message: response.data.message });
      }
    }
  };
  return (
    <Container>
      {/* <Paper> */}
      <form onSubmit={handleLogin} id="login-form">
        <TextField
          label="Username"
          id="username"
          className="username-input"
          type="text"
          placeholder="E.g. JohnDoe123"
          value={username}
          onChange={e => setUsername(e.target.value.trim())}
        />
        <TextField
          label="Password"
          id="password"
          className="password-input"
          placeholder="E.g. 124!Jigzx"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value.trim())}
        />
        <Button
          form="login-form"
          variant="contained"
          color="primary"
          type="submit"
          className="login-button"
        >
          Login
        </Button>
      </form>
      <div className="register-text">
        {'New to My Saved Recipes? '}
        <Link to="/account/register">Create an account.</Link>
      </div>
    </Container>
  );
};

Login.propTypes = propTypes;

export default Login;
