import React from 'react';
import { func, bool } from 'prop-types';

import { Recipe } from '../../../utils/api';

import SubmitRecipe from '../components';
import RecipeContext from '../../../context/RecipeContext';

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
      const { handleModalClose } = this.props;
      const { recipes, setRecipes } = this.context;
      const { url } = this.state;

      const encodedRecipeURI = encodeURIComponent(url);

      const { data } = await Recipe.submitRecipe(encodedRecipeURI);

      if (!data.alreadyAdded) {
        this.setState({ url: '' });

        setRecipes([...recipes, data]);
      }

      handleModalClose();
    } catch (err) {
      console.error(err.response);
      alert('We cant process this website currently');
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
