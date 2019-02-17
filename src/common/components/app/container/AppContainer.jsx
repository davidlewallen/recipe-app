import React from 'react';
import { shape, func, string } from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import HeaderContainer from '../../header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardRoutes from '../../../../dashboard/routes';
import AccountRoutes from '../../../../account/routes';

import { Account } from '../../../utils/api';

class AppContainer extends React.Component {
  static propTypes = {
    history: shape({ push: func.isRequired }).isRequired,
    location: shape({ pathname: string.isRequired }).isRequired,
  };

  state = {
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

  updateAuth = authValue => {
    this.setState({ isAuth: authValue });

    if (authValue) this.getUser();
  };

  render = () => {
    const {
      props: { location, history },
      state: { loading, isAuth, user },
    } = this;

    return (
      !loading && (
        <React.Fragment>
          {location.pathname !== '/' && (
            <HeaderContainer
              history={history}
              updateAuth={this.updateAuth}
              isAuth={isAuth}
            />
          )}
          <Switch>
            <Route exact path="/" component={HomepageContainer} />
            <Route
              path="/dashboard"
              render={() =>
                isAuth && user.username ? (
                  <DashboardRoutes />
                ) : (
                  <Redirect to="/account/login" />
                )
              }
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
      )
    );
  };
}

export default AppContainer;
