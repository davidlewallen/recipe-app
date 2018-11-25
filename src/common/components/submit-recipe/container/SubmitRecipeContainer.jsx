import React from 'react';
import { func, bool } from 'prop-types';

import SubmitRecipe from '../components';

import { Recipe } from '../../../utils/api';
import { RecipeContext } from '../../../context';

class SubmitRecipeContainer extends React.Component {
  static contextType = RecipeContext;

  static propTypes = {
    show: bool.isRequired,
    handleModalClose: func.isRequired,
  };

  state = { url: '' };

  handleURL = ({ target: { value } }) => this.setState({ url: value });

  submitRecipe = async event => {
    event.preventDefault();

    try {
      const {
        context: { updateRecipes, recipes },
        props: { handleModalClose },
        state: { url },
      } = this;
      const encodedRecipeURI = encodeURIComponent(url);
      const { data } = await Recipe.submitRecipe(encodedRecipeURI);

      if (!data.alreadyAdded) {
        this.setState({ url: '' });

        updateRecipes([...recipes, data]);
      }

      handleModalClose();
    } catch (err) {
      console.error(err.response);

      if (err && err.response && err.response.status === 403) {
        alert('We cant process this website currently');
      }
    }
  };

  render = () => {
    const {
      props: { show, handleModalClose },
      state: { url },
    } = this;

    return (
      <SubmitRecipe
        show={show}
        handleModalClose={handleModalClose}
        submitRecipe={this.submitRecipe}
        handleURL={this.handleURL}
        url={url}
      />
    );
  };
}

export default SubmitRecipeContainer;
