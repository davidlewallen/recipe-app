import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
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
      isAuth: true,
      loading: true,
      user: {
        email: '',
        username: '',
        _id: '',
      },
    };
  }

  componentWillMount = async () => {
    axios.interceptors.response.use(
      response => response,
      error => (
        error.response.status === 401 && this.props.location.pathname !== '/'
          ? this.setState({ isAuth: false })
          : Promise.reject(error)
      ),
    );
    const { data } = await Account.auth();
    this.setState({ isAuth: data.isAuth });

    if (data.isAuth) {
      await this.getUser();
    }
  }

  getUser = async () => {
    this.setState({ loading: true });
    const { data: user } = await Account.getUser();
    this.setState({ user, loading: false });
  }

  updateRecipes = (updatedRecipes) => {
    const isArray = Array.isArray(updatedRecipes);
    this.setState({ recipes: isArray ? updatedRecipes : [updatedRecipes] });
  }

  updateAuth = (authValue) => {
    this.setState({ isAuth: authValue });
    if (authValue) this.getUser();
  }

  render = () => !this.state.loading && (
    <div>
      {this.props.location.pathname !== '/' && (
        <HeaderContainer
          history={this.props.history}
          recipes={this.state.recipes}
          updateRecipes={this.updateRecipes}
          updateAuth={this.updateAuth}
          isAuth={this.state.isAuth}
        />
      )}
      <Switch>
        <Route exact path="/" component={HomepageContainer} />
        <Route
          path="/dashboard"
          render={() => (
            this.state.isAuth && this.state.user.username ? (
              <DashboardRoutes
                recipes={this.state.recipes}
                updateRecipes={this.updateRecipes}
              />
            ) : <Redirect to="/account/login" />
          )}
        />
        <Route
          path="/account"
          render={() => (
            <AccountRoutes
              isAuth={this.state.isAuth}
              updateAuth={this.updateAuth}
              user={this.state.user}
            />
          )}
        />
      </Switch>
    </div>
  )
}

AppContainer.propTypes = propTypes;
export default AppContainer;
