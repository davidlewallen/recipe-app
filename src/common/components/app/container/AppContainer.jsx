import React, { useState, useContext, useEffect, Suspense } from 'react';
import { shape, func, string } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import RecipeContext from '../../../context/RecipeContext';
import UserContext from '../../../context/UserContext';

import Header from '../../header/container/HeaderContainer';

const Homepage = React.lazy(() =>
  import('../../../scenes/homepage/components')
);
const DashboardContainer = React.lazy(() =>
  import('../../../../dashboard/scenes/dashboard/container/DashboardContainer')
);
const AccountRoutes = React.lazy(() => import('../../../../account/routes'));

const propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
};

function AppContainer({ location }) {
  const [recipes, setRecipes] = useState([]);
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
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      <Suspense fallback={<p>Loading...</p>}>
        {!userLoading && (
          <React.Fragment>
            {location.pathname !== '/' && <Header />}

            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/dashboard" component={DashboardContainer} />
              <Route path="/account" component={AccountRoutes} />
            </Switch>
          </React.Fragment>
        )}
      </Suspense>
    </RecipeContext.Provider>
  );
}

AppContainer.propTypes = propTypes;

export default AppContainer;
