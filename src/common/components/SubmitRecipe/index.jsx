import React from 'react';
import { func, bool, arrayOf, object } from 'prop-types';

import { Recipe } from '../../utils/api';

import SubmitRecipe from './components/SubmitRecipe';
import ManualSubmitRecipe from './components/ManualSubmitRecipe';

import './index.scss';

class SubmitRecipeContainer extends React.Component {
  static propTypes = {
    show: bool.isRequired,
    handleModalClose: func.isRequired,
    updateRecipes: func.isRequired,
    recipes: arrayOf(object.isRequired).isRequired,
  };

  initialState = {};

  state = {
    url: '',
    manualRecipe: {
      title: '',
      ingredients: [''],
      instructions: [''],
      notes: '',
    },
    showManualSubmit: false,
  };

  componentDidMount = () => {
    this.initialState = { ...this.state };
  };

  handleURL = ({ target: { value } }) => this.setState({ url: value });

  handleInputChange = e => {
    if (e.target && e.target.dataset && e.target.dataset.key) {
      e.persist();
      return this.setState(prevState => ({
        [e.target.dataset.key]: {
          ...prevState[e.target.dataset.key],
          [e.target.name]: e.target.value,
        },
      }));
    }

    return this.setState({ [e.target.name]: e.target.value });
  };

  handleIngredientInstructionChange = e => {
    e.persist();

    const { manualRecipe } = this.state;

    const copy = manualRecipe[e.target.name];

    copy[e.target.dataset.index] = e.target.value;

    this.setState(prevState => ({
      manualRecipe: {
        ...prevState.manualRecipe,
        [e.target.name]: copy,
      },
    }));
  };

  handleAddInput = (type, index) =>
    this.setState(prevState => {
      const original = prevState.manualRecipe[type];

      const beginning = original.slice(0, index + 1);
      const ending = original.slice(index + 1);

      const newData = beginning.concat('', ending);

      return {
        manualRecipe: {
          ...prevState.manualRecipe,
          [type]: newData,
        },
      };
    });

  handleRemoveInput = (type, index) =>
    this.setState(prevState => {
      const original = prevState.manualRecipe[type];

      const beginning = original.slice(0, index);
      const ending = original.slice(index + 1);

      const newData = beginning.concat(ending);

      return {
        manualRecipe: {
          ...prevState.manualRecipe,
          [type]: newData,
        },
      };
    });

  handleCancelRecipe = () => this.setState(this.initialState);

  submitRecipe = async event => {
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
  };

  render = () => {
    const {
      props: { show, handleModalClose },
      state: { url, showManualSubmit, manualRecipe },
    } = this;

    const handlers = {
      handleURL: this.handleURL,
      handleInputChange: this.handleInputChange,
      handleIngredientInstructionChange: this.handleIngredientInstructionChange,
      handleManualSubmit: this.handleManualSubmit,
      handleAddInput: this.handleAddInput,
      handleRemoveInput: this.handleRemoveInput,
      handleCancelRecipe: this.handleCancelRecipe,
    };

    if (!showManualSubmit) {
      return (
        <ManualSubmitRecipe
          {...handlers}
          url={url}
          manualRecipe={manualRecipe}
        />
      );
    }

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
