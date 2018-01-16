import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const {
  string, func, shape, bool,
} = PropTypes;
const propTypes = {
  username: string.isRequired,
  handleUsername: func.isRequired,
  password: string.isRequired,
  handlePassword: func.isRequired,
  error: shape({ value: bool, message: string }).isRequired,
  login: func.isRequired,
};

const Login = props => (
  <div className="login-container">
    {props.error.value && (
      <p>{props.error.message}</p>
    )}

    <form className="login">
      <input
        className="username-input"
        placeholder="Username"
        value={props.username}
        onChange={props.handleUsername}
      />
      <input
        className="password-input"
        placeholder="Password"
        type="password"
        value={props.password}
        onChange={props.handlePassword}
      />
      <button className="login-button" onClick={props.login}>Login</button>
    </form>

    <div>
      <p>
        New to My Saved Recipes? <Link to="/account/register">Create an account.</Link>
      </p>
    </div>
  </div>
);

Login.propTypes = propTypes;
export default Login;
