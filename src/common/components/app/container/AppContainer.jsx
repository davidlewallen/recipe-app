import React from 'react';
import { shape, func, string } from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import HeaderContainer from '../../header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardContainer from '../../../../dashboard/scenes/dashboard/container/DashboardContainer';
import AccountRoutes from '../../../../account/routes';

import { Account } from '../../../utils/api';
import { AuthContext, RecipeContext } from '../../../context';

class AppContainer extends React.Component {
  static propTypes = {
    history: shape({ push: func.isRequired }).isRequired,
    location: shape({ pathname: string.isRequired }).isRequired,
  };

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
      error =>
        error.response.status === 401 && location.pathname !== '/'
          ? this.setState({ isAuth: false })
          : Promise.reject(error)
    );

    const { data } = await Account.auth();
    this.setState({ isAuth: data.isAuth });

    if (data.isAuth) {
      await this.getUser();
    } else {
      this.setState({ loading: false });
    }
  };

  getUser = async () => {
    this.setState({ loading: true });

    const { data: user } = await Account.getUser();

    this.setState({ user, loading: false });
  };

  updateRecipes = updatedRecipes => {
    const isArray = Array.isArray(updatedRecipes);

    this.setState({ recipes: isArray ? updatedRecipes : [updatedRecipes] });
  };

  updateAuth = authValue => {
    this.setState({ isAuth: authValue });

    if (authValue) this.getUser();
  };

  render = () => {
    const {
      props: { location, history },
      state: { loading, recipes, isAuth, user },
    } = this;

    return (
      <AuthContext.Provider value={{ isAuth, updateAuth: this.updateAuth }}>
        <RecipeContext.Provider
          value={{ recipes, updateRecipes: this.updateRecipes }}
        >
          {!loading && (
            <React.Fragment>
              {location.pathname !== '/' && (
                <HeaderContainer history={history} />
              )}
              <Switch>
                <Route exact path="/" component={HomepageContainer} />
                <Route
                  path="/dashboard"
                  render={() =>
                    isAuth && user.username ? (
                      <DashboardContainer
                        recipes={recipes}
                        updateRecipes={this.updateRecipes}
                      />
                    ) : (
                      <Redirect to="/account/login" />
                    )
                  }
                />
                <Route
                  path="/account"
                  render={() => <AccountRoutes isAuth={isAuth} user={user} />}
                />
              </Switch>
            </React.Fragment>
          )}
        </RecipeContext.Provider>
      </AuthContext.Provider>
    );
  };
}

export default AppContainer;
