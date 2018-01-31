import React from 'react';
import PropTypes from 'prop-types';

import { Recipe } from '../../../utils/api';

import SubmitRecipe from '../components';

const {
  func,
  bool,
  arrayOf,
  object,
} = PropTypes;
const propTypes = {
  show: bool.isRequired,
  handleModalClose: func.isRequired,
  updateRecipes: func.isRequired,
  recipes: arrayOf(object.isRequired).isRequired,
};

class SubmitRecipeContainer extends React.Component {
  constructor() {
    super();

    this.state = { url: '' };
  }

  handleURL = (event) => {
    this.setState({ url: event.target.value });
  }

  submitRecipe = async (event) => {
    event.preventDefault();

    try {
      const encodedRecipeURI = encodeURIComponent(this.state.url);
      const { data } = await Recipe.submitRecipe(encodedRecipeURI);

      if (data.nonProcessable) {
        this.setState({ nonProcessable: true });
      } else if (!data.alreadyAdded) {
        this.props.handleModalClose();
        this.props.updateRecipes([data, ...this.props.recipes]);
      }
      this.setState({ url: '' });
    } catch (err) {
      console.error(err.response);

      if (err && err.response && err.response.status === 403) {
        alert('We cant process this website currently');
      }
    }
  }

  render = () => (
    <SubmitRecipe
      show={this.props.show}
      handleModalClose={this.props.handleModalClose}
      submitRecipe={this.submitRecipe}
      handleURL={this.handleURL}
      url={this.state.url}
    />
  )
}

SubmitRecipeContainer.propTypes = propTypes;
export default SubmitRecipeContainer;
