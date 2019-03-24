import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import Overview from '../scenes/overview/components';
import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';
import VerifyEmailPrompt from '../scenes/verify/components/VerifyEmailPrompt';
import VerifyEmailContainer from '../scenes/verify';
import UserContext from '../../common/context/UserContext';

function AccountRoutes() {
  const { userAuth, user } = useContext(UserContext);

  return (
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
}

export default AccountRoutes;
