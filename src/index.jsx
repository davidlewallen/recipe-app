import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import HomepageContainer from './common/scenes/homepage/container/HomepageContainer';
import DashboardRoutes from './dashboard/routes';
import Account from './account/routes';

import './common/assets/styles/app.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomepageContainer} />
      <Route path="/dashboard" component={DashboardRoutes} />
      <Route path="/account" component={Account} />
    </Switch>
  </Router>
  , document.getElementById('root'),
);

registerServiceWorker();
