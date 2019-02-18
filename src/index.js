import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './common/components/app/container/AppContainer';

import { UserProvider } from './common/context/UserContext';

// import serviceWorker from './serviceWorker';

import './common/assets/styles/app.css';

ReactDOM.render(
  <UserProvider>
    <Router>
      <Route component={AppContainer} />
    </Router>
  </UserProvider>,
  document.getElementById('root')
);

// serviceWorker();
