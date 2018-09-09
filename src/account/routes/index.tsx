import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { IPropTypes } from './types';

import Overview from '../scenes/overview/components';
import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';

const AccountRoutes: React.StatelessComponent<IPropTypes> = ({
  isAuth, user, updateAuth,
}) => (
  <Switch>
    <Route
      exact
      path="/account"
      render={() => (
        isAuth && user.username
          ? <Overview user={user} />
          : <Redirect to="/account/login" />
      )}
    />
    <Route
      path="/account/login"
      render={routeProps => {
        if (isAuth && user.username) {
          return <Redirect to="/dashboard" />
        }

        return <LoginContainer {...routeProps} updateAuth={updateAuth} />
      }}
    />
    <Route
      path="/account/register"
      render={routeProps => (
        isAuth && user.username
          ? <Redirect to="/dashboard" />
          : <RegisterContainer {...routeProps} />
      )}
    />
  </Switch>
);

export default AccountRoutes;
