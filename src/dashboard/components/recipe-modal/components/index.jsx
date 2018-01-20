import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { v1 as uuid } from 'uuid';

import '../assets/styles/index.css';

const {
  bool,
  func,
  shape,
  string,
  arrayOf,
} = PropTypes;
const propTypes = {
  showModal: bool.isRequired,
  handleModalClose: func.isRequired,
  selectedRecipe: shape({
    title: string.isRequired,
    ingredients: arrayOf(string).isRequired,
    instructions: arrayOf(string).isRequired,
    totalTime: string.isRequired,
    url: shape({ href: string.isRequired }).isRequired,
  }).isRequired,
  deleteRecipe: func.isRequired,
};

const RecipeModal = props => (
  <Modal
    show={props.showModal}
    onHide={props.handleModalClose}
    className="recipe-modal"
  >
    <Modal.Header
      closeButton
      className="header"
    >
      <Modal.Title className="title">
        <span>{props.selectedRecipe.title}</span>
        <span className="total-time">Total Time: {props.selectedRecipe.totalTime}</span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="body">
      <div className="ingredient-title">Ingredients:</div>
      {props.selectedRecipe.ingredients.map(ingredient => (
        <div className="ingredient" key={uuid()}>- {ingredient}</div>
      ))}

      <div className="instruction-title">Instructions:</div>
      {props.selectedRecipe.instructions.map(ingredient => (
        <div className="instruction" key={uuid()}>{ingredient}</div>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <a
        className="recipe-link"
        target="_blank"
        href={props.selectedRecipe.url.href}
      >
        Click here to view original recipe
      </a>
      <Button
        bsStyle="danger"
        bsSize="small"
        onClick={() => props.deleteRecipe(props.selectedRecipe._id)}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

RecipeModal.propTypes = propTypes;
export default RecipeModal;
