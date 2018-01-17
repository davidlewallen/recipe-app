import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardContainer from '../scenes/dashboard/container/DashboardContainer';

const DashboardRoutes = () => (
  <Switch>
    <Route path="/dashboard" component={DashboardContainer} />
  </Switch>
);

export default DashboardRoutes;
