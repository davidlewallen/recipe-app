import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

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
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <form>
          <FormGroup className="align-left">
            {props.error.value && (
              <p className="error-message">{props.error.message}</p>
            )}
            <ControlLabel>Username</ControlLabel>
            <FormControl
              id="username"
              className="username-input"
              type="text"
              placeholder="E.g. JohnDoe123"
              value={props.username}
              onChange={props.handleUsername}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
              id="password"
              className="password-input"
              placeholder="E.g. 124!Jigzx"
              type="password"
              value={props.password}
              onChange={props.handlePassword}
            />
            <Button
              block
              className="login-button"
              bsStyle="primary"
              onClick={props.login}
            >
              Login
            </Button>
            <div className="register-text">New to My Saved Recipes? <Link to="/account/register">Create an account.</Link></div>
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

Login.propTypes = propTypes;
export default Login;
