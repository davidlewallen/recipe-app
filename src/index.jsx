import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HeaderContainer from './common/components/header/container/HeaderContainer';
import HomepageContainer from './common/scenes/homepage/container/HomepageContainer';
import DashboardRoutes from './dashboard/routes';
import AccountRoutes from './account/routes';


import registerServiceWorker from './registerServiceWorker';

import './common/assets/styles/app.css';

class AppContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
    };
  }
  updateRecipes = (updatedRecipes) => {
    const isArray = Array.isArray(updatedRecipes);
    this.setState({ recipes: isArray ? updatedRecipes : [updatedRecipes] });
  }

  render = () => (
    <div>
      <Route
        render={({ history }) => (
          <HeaderContainer
            recipes={this.state.recipes}
            updateRecipes={this.updateRecipes}
            history={history}
          />
        )}
      />
      <Switch>
        <Route exact path="/" component={HomepageContainer} />
        <Route
          path="/dashboard"
          render={() => (
            <DashboardRoutes
              recipes={this.state.recipes}
              updateRecipes={this.updateRecipes}
            />
          )}
        />
        <Route path="/account" component={AccountRoutes} />
      </Switch>
    </div>
  )
}

export default AppContainer;

ReactDOM.render(
  <Router>
    <AppContainer />
  </Router>
  , document.getElementById('root'),
);

registerServiceWorker();
