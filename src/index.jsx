import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import HeaderContainer from './common/components/header/container/HeaderContainer';

import './common/assets/styles/app.css';

ReactDOM.render(
  <Router>
    <Route component={HeaderContainer} />
  </Router>
  , document.getElementById('root'),
);

registerServiceWorker();
