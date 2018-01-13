import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;
const propTypes = {
  username: string.isRequired,
  handleUsername: func.isRequired,
  password: string.isRequired,
  handlePassword: func.isRequired,
  login: func.isRequired,
};

const Login = props => (
  <form className="login">
    <input
      placeholder="Username"
      value={props.username}
      onChange={props.handleUsername}
    />
    <input
      placeholder="Password"
      value={props.password}
      onChange={props.handlePassword}
    />
    <button onClick={props.login}>Login</button>
  </form>
);

Login.propTypes = propTypes;
export default Login;
