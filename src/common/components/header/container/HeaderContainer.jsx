import React from 'react';
import PropTypes from 'prop-types';

import { Account, Utils } from '../../../utils/api';

import Header from '../components';
import SubmitRecipeContainer from '../../submit-recipe/container/SubmitRecipeContainer';
import AcceptedWebsites from '../../acceptedWebsites/components';

import '../assets/styles/index.css';

const {
  shape,
  func,
  arrayOf,
  object,
  bool,
} = PropTypes;
const propTypes = {
  history: shape({ replace: func.isRequired }).isRequired,
  updateRecipes: func.isRequired,
  recipes: arrayOf(object.isRequired).isRequired,
  isAuth: bool.isRequired,
  updateAuth: func.isRequired,
};

class HeaderContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      showAcceptedModal: false,
      acceptedWebsites: [],
    };
  }

  componentWillMount = async () => {
    const { data: acceptedWebsites } = await Utils.getAcceptedWebsites();
    this.setState({ acceptedWebsites });
  }

  logout = () => {
    Account.logout();
    this.props.updateAuth(false);
    this.props.history.replace('/');
  }

  handleModalOpen = () => {
    this.setState({ showModal: true });
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  }

  handleAcceptedModal = () => {
    this.setState(prevState => (
      { showAcceptedModal: !prevState.showAcceptedModal }
    ));
  }

  render = () => (
    <div>
      <SubmitRecipeContainer
        show={this.state.showModal}
        handleModalClose={this.handleModalClose}
        updateRecipes={this.props.updateRecipes}
        recipes={this.props.recipes}
      />
      <AcceptedWebsites
        show={this.state.showAcceptedModal}
        handleAcceptedModal={this.handleAcceptedModal}
        acceptedWebsites={this.state.acceptedWebsites}
      />
      <Header
        logout={this.logout}
        handleModalOpen={this.handleModalOpen}
        isAuth={this.props.isAuth}
        handleAcceptedModal={this.handleAcceptedModal}
      />
    </div>
  );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
