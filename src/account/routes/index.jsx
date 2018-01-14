import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from '../scenes/login/container/LoginContainer';
import RegisterContainer from '../scenes/register/container/RegisterContainer';

const AccountRoutes = () => (
  <Switch>
    <Route path="/account/login" component={LoginContainer} />
    <Route path="/account/register" component={RegisterContainer} />
  </Switch>
);

export default AccountRoutes;
