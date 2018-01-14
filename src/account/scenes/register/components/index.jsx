import React from 'react';
import PropTypes from 'prop-types';

const {
  string, func, shape, bool,
} = PropTypes;
const propTypes = {
  username: string.isRequired,
  handleUsername: func.isRequired,
  password: string.isRequired,
  handlePassword: func.isRequired,
  email: string.isRequired,
  handleEmail: func.isRequired,
  register: func.isRequired,
  error: shape({ value: bool, message: string }).isRequired,
};

const Register = props => (
  <div className="register-container">
    {props.error.value && (
      <p>{props.error.message}</p>
    )}
    <form className="register">
      <input
        placeholder="Username"
        value={props.username}
        onChange={props.handleUsername}
      />
      <input
        placeholder="Password"
        type="password"
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
  </div>
);

Register.propTypes = propTypes;
export default Register;
