import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const { string, func } = PropTypes;
const propTypes = {
  recipeLink: string.isRequired,
  recipeTitle: string.isRequired,
  recipeIngredients: string.isRequired,
  recipeInstructions: string.isRequired,
  recipeHour: string.isRequired,
  recipeMinute: string.isRequired,
  handleRecipeLink: func.isRequired,
  handleRecipeTitle: func.isRequired,
  handleRecipeIngredients: func.isRequired,
  handleRecipeInstructions: func.isRequired,
  handleRecipeHour: func.isRequired,
  handleRecipeMinute: func.isRequired,
  submitManualRecipe: func.isRequired,
  resetModal: func.isRequired,
};

const ManualEntry = props => (
  <div>
    <Row>
      <Col xs={12} className="align-center">
        <input
          placeholder="Recipe Link"
          value={props.recipeLink}
          onChange={props.handleRecipeLink}
        />
      </Col>
      <Col xs={12} className="align-center">
        <input
          placeholder="Recipe Title"
          value={props.recipeTitle}
          onChange={props.handleRecipeTitle}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="align-center">
        <textarea
          placeholder="Ingredients"
          value={props.recipeIngredients}
          onChange={props.handleRecipeIngredients}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="align-center">
        <textarea
          placeholder="Instructions"
          value={props.recipeInstructions}
          onChange={props.handleRecipeInstructions}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="align-center">
        <input
          placeholder="Hours"
          value={props.recipeHour}
          onChange={props.handleRecipeHour}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="align-center">
        <input
          placeholder="Minutes"
          value={props.recipeMinute}
          onChange={props.handleRecipeMinute}
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <Button
          block
          bsStyle="primary"
          onClick={props.submitManualRecipe}
        >
          Submit
        </Button>
      </Col>
      <Col xs={12}>
        <Button
          block
          bsStyle="danger"
          onClick={props.resetModal}
        >
          Cancel
        </Button>
      </Col>
    </Row>
  </div>
);

ManualEntry.propTypes = propTypes;
export default ManualEntry;
