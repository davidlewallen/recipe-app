import React from 'react';
import { string, func, shape, bool } from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

import '../index.css';

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
  <Grid className="register-container">
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <form className="register">
          <FormGroup>
            {error.value && <p>{error.message}</p>}

            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              className="username-input"
              placeholder="E.g. JohnDoe123"
              value={username}
              onChange={handleUsername}
            />

            <ControlLabel>Password</ControlLabel>
            <FormControl
              className="password-input"
              type="password"
              placeholder="E.g. 124!Jigzx"
              value={password}
              onChange={handlePassword}
            />

            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              className="email-input"
              placeholder="E.g. john@doe.com"
              value={email}
              onChange={handleEmail}
            />

            <Button
              className="register-button"
              bsStyle="primary"
              onClick={register}
              type="submit"
              block
            >
              Register
            </Button>

            <div className="already-registered-text">
              {'Already have an account? '}
              <Link to="/account/login">Sign in here.</Link>
            </div>
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

Register.propTypes = propTypes;
export default Register;
