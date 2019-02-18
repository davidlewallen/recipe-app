import React from 'react';
import { shape, func, string } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { RecipeProvider } from '../../../context/RecipeContext';
import UserContext from '../../../context/UserContext';

import HeaderContainer from '../../header/container/HeaderContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardContainer from '../../../../dashboard/scenes/dashboard/container/DashboardContainer';
import AccountRoutes from '../../../../account/routes';

class AppContainer extends React.PureComponent {
  static contextType = UserContext;

  static propTypes = {
    history: shape({ push: func.isRequired }).isRequired,
    location: shape({ pathname: string.isRequired }).isRequired,
  };

  componentDidMount = async () => {
    const { location } = this.props;
    const { setUserAuth } = this.context;

    axios.interceptors.response.use(
      response => response,
      error =>
        error.response.status === 401 && location.pathname !== '/'
          ? setUserAuth(false)
          : Promise.reject(error)
    );
  };

  render = () => {
    const {
      props: { location, history },
      context: { userLoading, userAuth, user },
    } = this;

    return (
      <RecipeProvider>
        {!userLoading && (
          <React.Fragment>
            {location.pathname !== '/' && <HeaderContainer history={history} />}

            <Switch>
              <Route exact path="/" component={HomepageContainer} />
              <Route path="/dashboard" component={DashboardContainer} />
              <Route
                path="/account"
                render={() => <AccountRoutes userAuth={userAuth} user={user} />}
              />
            </Switch>
          </React.Fragment>
        )}
      </RecipeProvider>
    );
  };
}

export default AppContainer;
