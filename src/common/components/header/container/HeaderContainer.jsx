import React from 'react';
import PropTypes from 'prop-types';

import { Account } from '../../../utils/api';

import Header from '../components';
import SubmitRecipe from '../../submit-recipe/container/SubmitRecipeContainer';

const {
  shape,
  func,
  arrayOf,
  object,
} = PropTypes;
const propTypes = {
  history: shape({ replace: func.isRequired }).isRequired,
  updateRecipes: func.isRequired,
  recipes: arrayOf(object.isRequired).isRequired,
};

class HeaderContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
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

  render = () => (
    <div>
      <SubmitRecipe
        show={this.state.showModal}
        handleModalClose={this.handleModalClose}
        updateRecipes={this.props.updateRecipes}
        recipes={this.props.recipes}
      />
      <Header
        logout={this.logout}
        handleModalOpen={this.handleModalOpen}
      />
    </div>
  );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
