import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';

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
  <Grid className="login">
    <div>
      <Row>
        <Col xs={12} className="align-center">
          {props.error.value && (
            <p className="error-message">{props.error.message}</p>
          )}
        </Col>
        <form className="align-center">
          <Col xs={12}>
            <input
              className="username-input"
              placeholder="Username"
              value={props.username}
              onChange={props.handleUsername}
            />
          </Col>
          <Col xs={12}>
            <input
              className="password-input"
              placeholder="Password"
              type="password"
              value={props.password}
              onChange={props.handlePassword}
            />
          </Col>
          <Col xs={12}>
            <Button
              className="login-button"
              onClick={props.login}
            >
              Login
            </Button>
          </Col>
        </form>
      </Row>
      <Row>
        <Col xs={12} className="align-center"><p>New to My Saved Recipes? <Link to="/account/register">Create an account.</Link></p></Col>
      </Row>
    </div>
  </Grid>
);

Login.propTypes = propTypes;
export default Login;
