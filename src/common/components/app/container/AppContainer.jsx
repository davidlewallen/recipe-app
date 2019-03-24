import React, { useContext, useEffect, Suspense } from 'react';
import { shape, func, string } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { RecipeProvider } from '../../../context/RecipeContext';
import UserContext from '../../../context/UserContext';

import HeaderContainer from '../../header/container/HeaderContainer';

const HomepageContainer = React.lazy(() =>
  import('../../../scenes/homepage/container/HomepageContainer')
);
const DashboardContainer = React.lazy(() =>
  import('../../../../dashboard/scenes/dashboard/container/DashboardContainer')
);
const AccountRoutes = React.lazy(() => import('../../../../account/routes'));

const propTypes = {
  history: shape({ push: func.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

function AppContainer({ history, location }) {
  const { userLoading, setUserAuth } = useContext(UserContext);

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error =>
        error.response.status === 401 && location.pathname !== '/'
          ? setUserAuth(false)
          : Promise.reject(error)
    );
  }, []);

  return (
    <RecipeProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {!userLoading && (
          <React.Fragment>
            {location.pathname !== '/' && <HeaderContainer history={history} />}

            <Switch>
              <Route exact path="/" component={HomepageContainer} />
              <Route path="/dashboard" component={DashboardContainer} />
              <Route path="/account" component={AccountRoutes} />
            </Switch>
          </React.Fragment>
        )}
      </Suspense>
    </RecipeProvider>
  );
}

AppContainer.propTypes = propTypes;

export default AppContainer;
