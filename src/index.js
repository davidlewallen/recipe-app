import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './common/components/app/container/AppContainer';

// import serviceWorker from './serviceWorker';

import './common/assets/styles/app.scss';

ReactDOM.render(
  <Router>
    <Route component={AppContainer} />
  </Router>,
  document.getElementById('root')
);

// serviceWorker();
