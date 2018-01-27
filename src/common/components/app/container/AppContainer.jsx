import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import HeaderContainer from '../../../components/header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardRoutes from '../../../../dashboard/routes';
import AccountRoutes from '../../../../account/routes';

import { Account } from '../../../utils/api';


const { func, shape, string } = PropTypes;
const propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};
class AppContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      isAuth: false,
    };
  }

  componentWillMount = async () => {
    axios.interceptors.response.use(
      response => response,
      error => (
        error.response.status === 401 && this.props.location.pathname !== '/'
          ? this.props.history.push('/account/login')
          : Promise.reject(error)
      ),
    );

    const { data } = await Account.auth();
    this.setState({ isAuth: data.isAuth });
  }

  updateRecipes = (updatedRecipes) => {
    const isArray = Array.isArray(updatedRecipes);
    this.setState({ recipes: isArray ? updatedRecipes : [updatedRecipes] });
  }

  updateAuth = (authValue) => {
    this.setState({ isAuth: authValue });
  }

  render = () => (
    <div>
      <HeaderContainer
        history={this.props.history}
        recipes={this.state.recipes}
        updateRecipes={this.updateRecipes}
        updateAuth={this.updateAuth}
        isAuth={this.state.isAuth}
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
        <Route
          path="/account"
          render={() => <AccountRoutes updateAuth={this.updateAuth} />}
        />
      </Switch>
    </div>
  )
}

AppContainer.propTypes = propTypes;
export default AppContainer;