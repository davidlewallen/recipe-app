import * as React from 'react';

import { IPropTypes, IState } from './types';

import { Recipe } from '../../../utils/api';

import SubmitRecipe from '../components';

class SubmitRecipeContainer extends React.Component<IPropTypes, IState> {
  state = { url: '' };
  
  handleURL = (event: { target: { value: String } }) => this.setState({ url: event.target.value });

  submitRecipe = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const {
        props: { updateRecipes, recipes, handleModalClose },
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
  }

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
  }
}

export default SubmitRecipeContainer;
