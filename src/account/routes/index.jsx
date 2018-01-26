import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';

const { func } = PropTypes;
const propTypes = {
  updateAuth: func.isRequired,
};

const AccountRoutes = props => (
  <Switch>
    <Route
      path="/account/login"
      render={({ history }) => (
        <LoginContainer
          history={history}
          updateAuth={props.updateAuth}
        />
      )}
    />
    <Route path="/account/register" component={RegisterContainer} />
  </Switch>
);

AccountRoutes.propTypes = propTypes;
export default AccountRoutes;
