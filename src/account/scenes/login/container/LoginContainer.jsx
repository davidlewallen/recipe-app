import React, { useState, useContext } from 'react';
import { shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

import { Account } from '../../../../common/utils/api';

import '../assets/styles/index.css';
import UserContext from '../../../../common/context/UserContext';

const propTypes = { history: shape({ replace: func.isRequired }).isRequired };

const Login = ({ history }) => {
  const { setUserAuth } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ value: false, message: '' });

  const updateError = ({ value, message }) =>
    setError({ ...error, ...value, ...message });

  const handleLogin = async event => {
    event.preventDefault();

    try {
      await Account.login({ username, password });

      setUserAuth(true);

      history.replace('/dashboard');
    } catch (err) {
      const { response } = err;

      if (response.status === 403 && !response.data.verified) {
        history.replace('/account/verify');
      }

      if (response.status === 400) {
        updateError({ value: true, message: response.data.message });
      }
    }
  };
  return (
    <Grid className="login">
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <form>
            <FormGroup className="align-left">
              {error.value && <p className="error-message">{error.message}</p>}
              <ControlLabel>Username</ControlLabel>
              <FormControl
                id="username"
                className="username-input"
                type="text"
                placeholder="E.g. JohnDoe123"
                value={username}
                onChange={e => setUsername(e.target.value.trim())}
              />
              <ControlLabel>Password</ControlLabel>
              <FormControl
                id="password"
                className="password-input"
                placeholder="E.g. 124!Jigzx"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value.trim())}
              />
              <Button
                block
                type="submit"
                className="login-button"
                bsStyle="primary"
                onClick={handleLogin}
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
};

Login.propTypes = propTypes;

export default Login;
