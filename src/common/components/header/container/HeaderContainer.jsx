import React from 'react';
import { shape, func } from 'prop-types';

import { Account, Utils } from '../../../utils/api';

import Header from '../components';
import SubmitRecipeContainer from '../../submit-recipe/container/SubmitRecipeContainer';
import AcceptedWebsites from '../../acceptedWebsites/components';

import '../assets/styles/index.css';
import UserContext from '../../../context/UserContext';

class HeaderContainer extends React.Component {
  static contextType = UserContext;

  static propTypes = {
    history: shape({ replace: func.isRequired }).isRequired,
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
    const { history } = this.props;
    const { setUserAuth } = this.context;

    Account.logout();

    setUserAuth(false);

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
      context: { userAuth },
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
          isAuth={userAuth}
          handleAcceptedModal={this.handleAcceptedModal}
        />
      </React.Fragment>
    );
  };
}

export default HeaderContainer;
