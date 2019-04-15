import React from 'react';
import { Redirect } from 'react-router-dom';

import RecipeContext from '../../../../common/context/RecipeContext';
import { UserConsumer } from '../../../../common/context/UserContext';
import { Recipe } from '../../../../common/utils/api';

import Dashboard from '../components';

class DashboardContainer extends React.Component {
  static contextType = RecipeContext;

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
    this.IS_MOUNTED = true;

    await this.getUserRecipes();
  };

  componentWillUnmount() {
    this.IS_MOUNTED = false;
  }

  getUserRecipes = async () => {
    const { setRecipes } = this.context;

    const { data: recipes } = await Recipe.getRecipes();

    setRecipes(recipes);

    if (this.IS_MOUNTED) this.setState({ loadingRecipes: false });
  };

  deleteRecipe = async recipeId => {
    const { setRecipes } = this.context;

    try {
      const { data: recipes } = await Recipe.deleteRecipe(recipeId);

      setRecipes(recipes);
    } catch (err) {
      console.log(err);
    }
  };

  handleModalClose = () => this.setState({ showModal: false });

  viewRecipe = recipe =>
    this.setState({
      showModal: true,
      selectedRecipe: recipe,
    });

  handleSearch = ({ target: { value } }) =>
    this.setState({ searchValue: value });

  render = () => {
    const {
      state: { showModal, selectedRecipe, searchValue, loadingRecipes },
      context: { recipes },
    } = this;

    return (
      <UserConsumer>
        {({ userAuth }) =>
          userAuth ? (
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
          ) : (
            <Redirect to="/account/login" />
          )
        }
      </UserConsumer>
    );
  };
}

export default DashboardContainer;
