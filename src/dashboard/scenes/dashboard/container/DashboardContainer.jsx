import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../components';

import { Recipe } from '../../../../common/utils/api';

const {
  func,
  arrayOf,
  object,
} = PropTypes;
const propTypes = {
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
      searchValue: '',
    };
  }

  componentWillMount = async () => {
    await this.getUserRecipes();
  }

  getUserRecipes = async () => {
    try {
      const { data: recipes } = await Recipe.getRecipes();
      this.props.updateRecipes(recipes.reverse());
    } catch (err) {
      console.log(err);
    }
  }

  deleteRecipe = async (recipeId) => {
    try {
      const { data: recipes } = await Recipe.deleteRecipe(recipeId);

      this.props.updateRecipes(recipes.reverse());
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

  handleSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  render = () => (
    <Dashboard
      recipes={this.props.recipes}
      deleteRecipe={this.deleteRecipe}
      showModal={this.state.showModal}
      handleModalClose={this.handleModalClose}
      viewRecipe={this.viewRecipe}
      selectedRecipe={this.state.selectedRecipe}
      searchValue={this.state.searchValue}
      handleSearch={this.handleSearch}
    />
  );
}

DashboardContainer.propTypes = propTypes;
export default DashboardContainer;
