import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './common/components/app/container/AppContainer';

import registerServiceWorker from './registerServiceWorker';

import './common/assets/styles/app.css';

ReactDOM.render(
  <Router>
    <Route component={AppContainer} />
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
