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

    this.state = {
      url: '',
      nonProcessable: false,
      recipeLink: '',
      recipeTitle: '',
      recipeIngredients: '',
      recipeInstructions: '',
      recipeHour: '',
      recipeMinute: '',
      manualEntry: false,
    };
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

  handleRecipeLink = ({ target: { value } }) => {
    this.setState({ recipeLink: value });
  }

  handleRecipeTitle = ({ target: { value } }) => {
    this.setState({ recipeTitle: value });
  }

  handleRecipeIngredients = ({ target: { value } }) => {
    this.setState({ recipeIngredients: value });
  }

  handleRecipeInstructions = ({ target: { value } }) => {
    this.setState({ recipeInstructions: value });
  }

  handleRecipeHour = ({ target: { value } }) => {
    this.setState({ recipeHour: value });
  }

  handleRecipeMinute = ({ target: { value } }) => {
    this.setState({ recipeMinute: value });
  }

  submitManualRecipe = () => {
    console.log('this.state', this.state);
  }

  handleManualEntry = () => {
    this.setState({ manualEntry: true });
  }

  handleWaitButton = () => {
    this.handleModalClose();
    this.setState({ url: '' });
  }

  handleModalClose = () => {
    this.props.handleModalClose();
    this.resetModal();
  }

  resetModal = () => {
    this.setState({
      url: '',
      recipeTitle: '',
      recipeIngredients: '',
      recipeInstructions: '',
      recipeHour: '',
      recipeMinute: '',
      nonProcessable: false,
      manualEntry: false,
    });
  }

  render = () => (
    <SubmitRecipe
      show={this.props.show}
      handleModalClose={this.handleModalClose}
      submitRecipe={this.submitRecipe}
      handleURL={this.handleURL}
      url={this.state.url}
      nonProcessable={this.state.nonProcessable}
      recipeLink={this.state.recipeLink}
      recipeTitle={this.state.recipeTitle}
      recipeIngredients={this.state.recipeIngredients}
      recipeInstructions={this.state.recipeInstructions}
      recipeHour={this.state.recipeHour}
      recipeMinute={this.state.recipeMinute}
      handleRecipeLink={this.handleRecipeLink}
      handleRecipeTitle={this.handleRecipeTitle}
      handleRecipeIngredients={this.handleRecipeIngredients}
      handleRecipeInstructions={this.handleRecipeInstructions}
      handleRecipeHour={this.handleRecipeHour}
      handleRecipeMinute={this.handleRecipeMinute}
      submitManualRecipe={this.submitManualRecipe}
      manualEntry={this.state.manualEntry}
      handleManualEntry={this.handleManualEntry}
      handleWaitButton={this.handleWaitButton}
      resetModal={this.resetModal}
    />
  )
}

SubmitRecipeContainer.propTypes = propTypes;
export default SubmitRecipeContainer;
