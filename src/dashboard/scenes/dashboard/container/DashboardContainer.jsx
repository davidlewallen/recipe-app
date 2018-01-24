import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../components';

import { Recipe, Account } from '../../../../common/utils/api';

const {
  shape,
  func,
  arrayOf,
  object,
} = PropTypes;
const propTypes = {
  history: shape({ replace: func }).isRequired,
  recipes: arrayOf(object.isRequired).isRequired,
  updateRecipes: func.isRequired,
};

class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      selectedRecipe: {
        title: '',
        ingredients: [],
        instructions: [],
        totalTime: '',
        url: {
          href: '',
        },
      },
    };
  }

  componentWillMount = async () => {
    await this.initialize();
  }

  getUserRecipes = async () => {
    const { data: recipes } = await Recipe.getRecipes();
    this.props.updateRecipes(recipes);
  }

  checkIsAuth = async () => {
    try {
      const { data } = await Account.auth();

      if (data.isAuth === false) {
        this.props.history.replace('/account/login');
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  initialize = async () => {
    await this.checkIsAuth();
    await this.getUserRecipes();
  }

  deleteRecipe = async (recipeId) => {
    try {
      const { data: recipes } = await Recipe.deleteRecipe(recipeId);

      this.setState(prevState => ({
        recipe: {
          ...prevState.recipe,
          list: recipes,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  }

  handleModalClose = () => {
    this.setState({ showModal: false });
  }

  viewRecipe = (recipe) => {
    this.setState({
      showModal: true,
      selectedRecipe: recipe,
    });
  }

  render = () => (
    <Dashboard
      recipes={this.props.recipes}
      deleteRecipe={this.deleteRecipe}
      showModal={this.state.showModal}
      handleModalClose={this.handleModalClose}
      viewRecipe={this.viewRecipe}
      selectedRecipe={this.state.selectedRecipe}
    />
  );
}

DashboardContainer.propTypes = propTypes;
export default DashboardContainer;
