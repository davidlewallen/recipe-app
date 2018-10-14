import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import DashboardContainer from '../scenes/dashboard/container/DashboardContainer';

const { arrayOf, object, func } = PropTypes;
const propTypes = {
  recipes: arrayOf(object.isRequired).isRequired,
  updateRecipes: func.isRequired,
};

const DashboardRoutes = props => (
  <Switch>
    <Route
      path="/dashboard"
      render={({ history }) => (
        <DashboardContainer
          history={history}
          recipes={props.recipes}
          updateRecipes={props.updateRecipes}
        />
      )}
    />
  </Switch>
);

DashboardRoutes.propTypes = propTypes;
export default DashboardRoutes;
