import React from 'react';
import { func, arrayOf, object } from 'prop-types';

import Dashboard from '../components';

import { Recipe } from '../../../../common/utils/api';

class DashboardContainer extends React.Component {
  static propTypes = {
    recipes: arrayOf(object.isRequired).isRequired,
    updateRecipes: func.isRequired,
  }

  state = {
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
    loadingRecipes: true,
  };

  componentDidMount = async () => {
    await this.getUserRecipes();
  }

  getUserRecipes = async () => {
    const { updateRecipes } = this.props;

    this.setState({ loadingRecipes: true });
    try {
      const { data: recipes } = await Recipe.getRecipes();
      updateRecipes(recipes);
    } catch (err) {
      console.log(err);
    }

    this.setState({ loadingRecipes: false });
  }

  deleteRecipe = async (recipeId) => {
    const { updateRecipes } = this.props;

    try {
      const { data: recipes } = await Recipe.deleteRecipe(recipeId);
      updateRecipes(recipes);
    } catch (err) {
      console.log(err);
    }
  }

  handleModalClose = () => this.setState({ showModal: false });

  viewRecipe = recipe => this.setState({
    showModal: true,
    selectedRecipe: recipe,
  });

  handleSearch = ({ target: { value } }) => this.setState({ searchValue: value });

  render = () => {
    const {
      props: { recipes },
      state: {
        showModal, selectedRecipe, searchValue, loadingRecipes,
      },
    } = this;

    return (
      <Dashboard
        recipes={recipes}
        deleteRecipe={this.deleteRecipe}
        showModal={showModal}
        handleModalClose={this.handleModalClose}
        viewRecipe={this.viewRecipe}
        selectedRecipe={selectedRecipe}
        searchValue={searchValue}
        handleSearch={this.handleSearch}
        loadingRecipes={loadingRecipes}
      />
    );
  }
}

export default DashboardContainer;
