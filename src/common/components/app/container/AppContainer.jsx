// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Recipe } from '../../../types/recipe';

import HeaderContainer from '../../../components/header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardRoutes from '../../../../dashboard/routes';
import AccountRoutes from '../../../../account/routes';

import { Account } from '../../../utils/api';

type Props = {
  history: {
    push: (location: string) => void,
    replace: (location: string) => void,
  },
  location: { pathanme: string },
}

type State = {
  recipes: Array<Recipe>,
  isAuth: boolean,
}
class AppContainer extends React.Component<Props, State> {
  state = {
    recipes: [],
    isAuth: false,
  }

  componentWillMount = async () => {
    axios.interceptors.response.use(
      response => response,
      error => (
          ? this.props.history.push('/account/login')
        error.response.status === 401 && this.props.location.pathname !== '/'
          : Promise.reject(error)
      ),
    );

    const { data } = await Account.auth();
    this.setState({ isAuth: data.isAuth });
  }

  updateRecipes = (updatedRecipes: Array<Recipe>): void => {
    const isArray = Array.isArray(updatedRecipes);
    this.setState({ recipes: isArray ? updatedRecipes : [updatedRecipes] });
  }

  updateAuth = (authValue: boolean): void => {
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

export default AppContainer;
