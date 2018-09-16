import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Overview from '../scenes/overview/components';
import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';
import VerifyEmail from '../scenes/verify';

const {
  bool,
  func,
  objectOf,
  string,
} = PropTypes;
const propTypes = {
  isAuth: bool.isRequired,
  updateAuth: func.isRequired,
  user: objectOf(string.isRequired).isRequired,
};

const AccountRoutes = props => (
  <Switch>
    <Route
      exact
      path="/account"
      render={() => (
        props.isAuth && props.user.username
          ? <Overview user={props.user} />
          : <Redirect to="/account/login" />
      )}
    />
    <Route
      path="/account/login"
      render={routeProps => (
        props.isAuth && props.user.username
          ? <Redirect to="/dashboard" />
          : <LoginContainer {...routeProps} updateAuth={props.updateAuth} />
      )}
    />
    <Route
      path="/account/register"
      render={routeProps => (
        props.isAuth && props.user.username
          ? <Redirect to="/dashboard" />
          : <RegisterContainer {...routeProps} />
      )}
    />
    <Route path="/account/verify" component={VerifyEmail} />
  </Switch>
);

AccountRoutes.propTypes = propTypes;
export default AccountRoutes;
