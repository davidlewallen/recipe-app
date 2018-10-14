import React from 'react';
import { string, func, shape, bool } from 'prop-types';

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

const Register = ({
  error,
  username,
  handleUsername,
  password,
  handlePassword,
  email,
  handleEmail,
  register,
}) => (
  <div className="register-container">
    {error.value && <p>{error.message}</p>}
    <form className="register">
      <input
        className="username-input"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
      <input
        className="password-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <input
        className="email-input"
        placeholder="Email Address"
        value={email}
        onChange={handleEmail}
      />
      <button className="register-button" onClick={register} type="button">
        Register
      </button>
    </form>
  </div>
);

Register.propTypes = propTypes;
export default Register;
