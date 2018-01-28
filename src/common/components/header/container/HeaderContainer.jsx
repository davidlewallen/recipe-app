// @flow
import * as React from 'react';

import { Account } from '../../../utils/api';

import { Recipe } from '../../../types/recipe';

import Header from '../components';
import SubmitRecipe from '../../submit-recipe/container/SubmitRecipeContainer';

type Props = {
  history: { replace: (location: string) => void },
  updateRecipes: (recipeList: Array<Recipe>) => void,
  recipes: Array<Recipe>,
  isAuth: boolean,
  updateAuth: (isAuth: boolean) => void,
};

type State = {
  showModal: boolean,
}

class HeaderContainer extends React.Component<Props, State> {
  state = {
    showModal: false,
  }

  logout = (): void => {
    Account.logout();
    this.props.updateAuth(false);
    this.props.history.replace('/');
  }

  handleModalOpen = (): void => {
    this.setState({ showModal: true });
  }

  handleModalClose = (): void => {
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
        isAuth={this.props.isAuth}
      />
    </div>
  );
}

export default HeaderContainer;
