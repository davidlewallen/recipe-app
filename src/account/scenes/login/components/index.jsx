import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { string, func } = PropTypes;
const propTypes = {
  username: string.isRequired,
  handleUsername: func.isRequired,
  password: string.isRequired,
  handlePassword: func.isRequired,
  login: func.isRequired,
};

const Login = props => (
  <div className="login-container">
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

    <div>
      <p>
        New to My Saved Recipes? <Link to="/account/register">Create an account.</Link>
      </p>
    </div>
  </div>
);

Login.propTypes = propTypes;
export default Login;
