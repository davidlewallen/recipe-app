import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { IPropTypes, IState, IRecipe } from './types';

import HeaderContainer from '../../header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardRoutes from '../../../../dashboard/routes';
import AccountRoutes from '../../../../account/routes';

import { Account } from '../../../utils/api';

class AppContainer extends React.Component<IPropTypes, IState> {
  state = {
    recipes: [],
    isAuth: true,
    loading: true,
    user: {
      email: '',
      username: '',
      _id: '',
    },
  };

  componentDidMount = async () => {
    const { location } = this.props;

    axios.interceptors.response.use(
      response => response,
      error => (
        error.response.status === 401 && location.pathname !== '/'
          ? this.setState({ isAuth: false })
          : Promise.reject(error)
      ),
    );

    try {
      const { data } = await Account.auth();
      this.setState({ isAuth: data.isAuth });

      if (data.isAuth) {
        await this.getUser();
      } else {
        this.setState({ loading: false });
      }
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err.request);
    }
  }

  getUser = async () => {
    this.setState({ loading: true });

    const { data: user } = await Account.getUser();

    this.setState({ user, loading: false });
  }

  updateRecipes = (updatedRecipes: Array<IRecipe>) => {
    this.setState({ recipes: updatedRecipes });
  }

  updateAuth = (authValue: Boolean) => {
    this.setState({ isAuth: authValue });

    if (authValue) this.getUser();
  }

  render = () => {
    const {
      props: { location, history },
      state: {
        loading, recipes, isAuth, user,
      },
    } = this;

    return !loading && (
      <React.Fragment>
        {location.pathname !== '/' && (
          <HeaderContainer
            history={history}
            recipes={recipes}
            updateRecipes={this.updateRecipes}
            updateAuth={this.updateAuth}
            isAuth={isAuth}
          />
        )}
        <Switch>
          <Route exact path="/" component={HomepageContainer} />
          <Route
            path="/dashboard"
            render={() => (
              isAuth && user.username
                ? (
                  <DashboardRoutes
                    recipes={recipes}
                    updateRecipes={this.updateRecipes}
                  />
                ) : <Redirect to="/account/login" />
            )}
          />
          <Route
            path="/account"
            render={() => (
              <AccountRoutes
                isAuth={isAuth}
                updateAuth={this.updateAuth}
                user={user}
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AppContainer;
