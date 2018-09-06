import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { IPropTypes } from './types';

import genKey from '../../../../common/utils/randomKeys';

import '../assets/styles/index.css';

const RecipeModal: React.StatelessComponent<IPropTypes> = ({
  showModal, handleModalClose, selectedRecipe, deleteRecipe,
}) => (
  <Modal
    show={showModal}
    onHide={handleModalClose}
    className="recipe-modal"
  >
    <Modal.Header
      closeButton
      className="header"
    >
      <Modal.Title className="title">
        <span>
          {selectedRecipe.title}
        </span>
        <span className="total-time">
          {`Total Time: ${selectedRecipe.totalTime || 'n/a'}`}
        </span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="body">
      <div className="ingredient-title">Ingredients:</div>
      {selectedRecipe.ingredients.map(ingredient => (
        <div className="ingredient" key={genKey(ingredient)}>
          {`- ${ingredient}`}
        </div>
      ))}

      <div className="instruction-title">Instructions:</div>
      {selectedRecipe.instructions.map(instruction => (
        <div className="instruction" key={genKey(instruction)}>
          {instruction}
        </div>
      ))}
    </Modal.Body>
    <Modal.Footer>
      <a
        className="recipe-link"
        target="_blank"
        rel="noopener noreferrer"
        href={selectedRecipe.url.href}
      >
        Click here to view original recipe
      </a>
      <Button
        bsStyle="danger"
        bsSize="small"
        onClick={() => deleteRecipe(selectedRecipe._id)}
        type="button"
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RecipeModal;
