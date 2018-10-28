import React from 'react';
import { shape, func, arrayOf, object, bool } from 'prop-types';

import { Account, Utils } from '../../../utils/api';

import Header from '../components';
import SubmitRecipeContainer from '../../SubmitRecipe';
import AcceptedWebsites from '../../acceptedWebsites/components';

import '../assets/styles/index.css';

class HeaderContainer extends React.Component {
  static propTypes = {
    history: shape({ replace: func.isRequired }).isRequired,
    updateRecipes: func.isRequired,
    recipes: arrayOf(object.isRequired).isRequired,
    isAuth: bool.isRequired,
    updateAuth: func.isRequired,
  };

  state = {
    showModal: false,
    showAcceptedModal: false,
    acceptedWebsites: [],
  };

  componentDidMount = async () => {
    const { data: acceptedWebsites } = await Utils.getAcceptedWebsites();

    this.setState({ acceptedWebsites });
  };

  logout = () => {
    const { updateAuth, history } = this.props;

    Account.logout();
    updateAuth(false);
    history.replace('/');
  };

  handleModalOpen = () => this.setState({ showModal: true });

  handleModalClose = () => this.setState({ showModal: false });

  handleAcceptedModal = () =>
    this.setState(prevState => ({
      showAcceptedModal: !prevState.showAcceptedModal,
    }));

  render = () => {
    const {
      props: { updateRecipes, recipes, isAuth },
      state: { showModal, showAcceptedModal, acceptedWebsites },
    } = this;

    return (
      <React.Fragment>
        <SubmitRecipeContainer
          show={showModal}
          handleModalClose={this.handleModalClose}
          updateRecipes={updateRecipes}
          recipes={recipes}
        />
        <AcceptedWebsites
          show={showAcceptedModal}
          handleAcceptedModal={this.handleAcceptedModal}
          acceptedWebsites={acceptedWebsites}
        />
        <Header
          logout={this.logout}
          handleModalOpen={this.handleModalOpen}
          isAuth={isAuth}
          handleAcceptedModal={this.handleAcceptedModal}
        />
      </React.Fragment>
    );
  };
}

export default HeaderContainer;
