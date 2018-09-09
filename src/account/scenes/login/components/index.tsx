import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';

import { PropTypes } from './types';

const Login: React.StatelessComponent<PropTypes> = ({
  error, username, handleUsername, password, handlePassword, login,
}) => (
  <Grid className="login">
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <form>
          <FormGroup className="align-left">
            {error.value && (
              <p className="error-message">{error.message}</p>
            )}
            <ControlLabel>Username</ControlLabel>
            <FormControl
              id="username"
              className="username-input"
              type="text"
              placeholder="E.g. JohnDoe123"
              value={username}
              onChange={handleUsername}
            />
            <ControlLabel>Password</ControlLabel>
            <FormControl
              id="password"
              className="password-input"
              placeholder="E.g. 124!Jigzx"
              type="password"
              value={password}
              onChange={handlePassword}
            />
            <Button
              block
              type="submit"
              className="login-button"
              bsStyle="primary"
              onClick={login}
            >
              Login
            </Button>
            <div className="register-text">
              {'New to My Saved Recipes? '}
              <Link to="/account/register">
                Create an account.
              </Link>
            </div>
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

export default Login;
