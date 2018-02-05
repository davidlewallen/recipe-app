// @flow
import React from 'react';

import { type RouterHistory } from 'react-router-dom';
import { type Recipes, type Recipe } from '../../../types';

import { Account, Utils } from '../../../utils/api';

import Header from '../components';
import SubmitRecipeContainer from '../../submit-recipe/container/SubmitRecipeContainer';
import AcceptedWebsites from '../../acceptedWebsites/components';

import '../assets/styles/index.css';

type Props = {
  history: RouterHistory,
  updateRecipes: (recipes: Recipes | Recipe) => void,
  recipes: Recipes,
  isAuth: boolean,
  updateAuth: () => void,
}

type State = {
  showModal: boolean,
  showAcceptedModal: boolean,
  acceptedWebsites: Array<String>,
}

class HeaderContainer extends React.Component<Props, State> {
  state = {
    showModal: false,
    showAcceptedModal: false,
    acceptedWebsites: [],
  };

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

export default HeaderContainer;
