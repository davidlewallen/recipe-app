import React from 'react';
import PropTypes from 'prop-types';

const { string, func } = PropTypes;
const propTypes = {
  username: string.isRequired,
  handleUsername: func.isRequired,
  password: string.isRequired,
  handlePassword: func.isRequired,
  email: string.isRequired,
  handleEmail: func.isRequired,
  register: func.isRequired,
};

const Register = props => (
  <form className="register">
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
    <input
      placeholder="Email Address"
      value={props.email}
      onChange={props.handleEmail}
    />
    <button onClick={props.register}>Register</button>
  </form>
);

Register.propTypes = propTypes;
export default Register;
