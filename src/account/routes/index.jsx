import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from '../login/container/LoginContainer';

const AccountRoutes = () => (
  <Switch>
    <Route exact path="/account/login" component={LoginContainer} />
  </Switch>
);

export default AccountRoutes;
