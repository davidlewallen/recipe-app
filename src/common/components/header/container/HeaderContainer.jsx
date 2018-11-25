import React from 'react';
import { shape, func, arrayOf, object } from 'prop-types';

import { Account, Utils } from '../../../utils/api';

import Header from '../components';
import SubmitRecipeContainer from '../../submit-recipe/container/SubmitRecipeContainer';
import AcceptedWebsites from '../../acceptedWebsites/components';

import { AuthContext } from '../../../context';

import '../assets/styles/index.css';

class HeaderContainer extends React.Component {
  static contextType = AuthContext;

  static propTypes = {
    history: shape({ replace: func.isRequired }).isRequired,
    updateRecipes: func.isRequired,
    recipes: arrayOf(object.isRequired).isRequired,
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
    const {
      props: { history },
      context: { updateAuth },
    } = this;

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
      context: { isAuth },
      state: { showModal, showAcceptedModal, acceptedWebsites },
    } = this;

    return (
      <React.Fragment>
        <SubmitRecipeContainer
          show={showModal}
          handleModalClose={this.handleModalClose}
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
