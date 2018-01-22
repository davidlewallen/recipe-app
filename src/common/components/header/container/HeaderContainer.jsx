import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { Account } from '../../../utils/api';

import Header from '../components';
import SubmitRecipe from '../../submit-recipe/container/SubmitRecipeContainer';
import HomepageContainer from '../../../scenes/homepage/container/HomepageContainer';
import DashboardRoutes from '../../../../dashboard/routes';
import AccountRoutes from '../../../../account/routes';

const { shape, func } = PropTypes;
const propTypes = {
  history: shape({ replace: func.isRequired }).isRequired,
};

class HeaderContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      recipes: [],
    };
  }

  logout = async () => {
    await Account.logout();
    this.props.history.replace('/');
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  }
  updateRecipes = (updatedRecipes) => {
    this.setState(prevState => ({ recipes: [...prevState.recipes, ...updatedRecipes] }));
  }

  render = () => (
    <div>
      <SubmitRecipe
        show={this.state.showModal}
        handleModalClose={this.handleModalClose}
        updateRecipes={this.updateRecipes}
      />
      <Header
        logout={this.logout}
        handleModalOpen={this.handleModalOpen}
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
        <Route path="/account" component={AccountRoutes} />
      </Switch>
    </div>
  );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
