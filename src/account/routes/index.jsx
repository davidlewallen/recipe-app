import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import Overview from '../scenes/overview/components';
import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';
import VerifyEmailPrompt from '../scenes/verify/components/VerifyEmailPrompt';
import VerifyEmailContainer from '../scenes/verify';

const propTypes = {
  userAuth: bool.isRequired,
  user: shape({
    username: string.isRequire,
    email: string.isRequire,
    verification: shape({ status: bool }),
  }).isRequired,
};

const AccountRoutes = ({ userAuth, user }) => (
  <Switch>
    <Route exact path="/account" component={Overview} />
    <Route
      path="/account/login"
      render={routeProps =>
        userAuth && user.username ? (
          <Redirect to="/dashboard" />
        ) : (
          <LoginContainer {...routeProps} />
        )
      }
    />
    <Route
      path="/account/register"
      render={routeProps =>
        userAuth && user.username ? (
          <Redirect to="/dashboard" />
        ) : (
          <RegisterContainer {...routeProps} />
        )
      }
    />

    <Route
      path="/account/verify"
      render={({ location, history }) => {
        const queryParams = queryString.parse(location.search);

        if (queryParams.id) {
          return (
            <VerifyEmailContainer
              userId={queryParams.id}
              verificationKey={queryParams.key}
              history={history}
            />
          );
        }

        return <VerifyEmailPrompt />;
      }}
    />
  </Switch>
);

AccountRoutes.propTypes = propTypes;
export default AccountRoutes;
