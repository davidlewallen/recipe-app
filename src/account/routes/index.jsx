import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';

const { bool, func } = PropTypes;
const propTypes = {
  isAuth: bool.isRequired,
  updateAuth: func.isRequired,
};

const AccountRoutes = props => (
  <Switch>
    <Route
      path="/account/login"
      render={routeProps => (
        props.isAuth
          ? <Redirect to="/dashboard" />
          : (
            <LoginContainer
              {...routeProps}
              updateAuth={props.updateAuth}
            />
          )
      )}
    />
    <Route path="/account/register" component={RegisterContainer} />
  </Switch>
);

AccountRoutes.propTypes = propTypes;
export default AccountRoutes;
