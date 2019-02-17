import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppContainer from './common/components/app/container/AppContainer';

import { RecipeProvider } from './common/context/RecipeContext';

// import serviceWorker from './serviceWorker';

import './common/assets/styles/app.css';

ReactDOM.render(
  <RecipeProvider>
    <Router>
      <Route component={AppContainer} />
    </Router>
  </RecipeProvider>,
  document.getElementById('root')
);

// serviceWorker();
