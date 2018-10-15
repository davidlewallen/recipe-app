import React from 'react';
import { string, func, shape, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

const propTypes = {
  email: string.isRequired,
  password: string.isRequired,
  error: shape({ value: bool, message: string }).isRequired,
  login: func.isRequired,
  handleInputChange: func.isRequired,
};

const Login = ({ error, email, password, login, handleInputChange }) => (
  <Grid className="login">
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <form>
          <FormGroup className="align-left">
            {error.value && <p className="error-message">{error.message}</p>}

            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              name="email"
              className="email-input"
              type="text"
              placeholder="E.g. john@doe.com"
              value={email}
              onChange={handleInputChange}
            />

            <ControlLabel>Password</ControlLabel>
            <FormControl
              name="password"
              className="password-input"
              placeholder="E.g. 124!Jigzx"
              type="password"
              value={password}
              onChange={handleInputChange}
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
              <Link to="/account/register">Create an account.</Link>
            </div>
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

Login.propTypes = propTypes;
export default Login;
