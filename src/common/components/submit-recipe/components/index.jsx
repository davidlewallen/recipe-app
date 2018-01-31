import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from 'react-bootstrap';

import ManualEntry from './ManualEntry';

const { bool, string, func } = PropTypes;
const propTypes = {
  show: bool.isRequired,
  handleModalClose: func.isRequired,
  submitRecipe: func.isRequired,
  handleURL: func.isRequired,
  url: string.isRequired,
  nonProcessable: bool.isRequired,
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
  handleWaitButton: func.isRequired,
  handleManualEntry: func.isRequired,
  manualEntry: bool.isRequired,
  resetModal: func.isRequired,
};

const SubmitRecipe = props => (
  <Modal
    show={props.show}
    onHide={props.handleModalClose}
    className="submit-recipe-modal"
  >
    <Modal.Header closeButton className="header">
      <Modal.Title className="title">Submit Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body className="body">
      {props.manualEntry && <ManualEntry {...props} />}
      {props.nonProcessable && !props.manualEntry && (
        <div>
          <Row>
            <Col xs={12}>
              <div>
                Website cannot be process at this time.
                Our team has been notified and are working to add this website.
              </div>
              <div>
                You can either wait until the website has been added
                or manually enter the recipe yourself.
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="align-center">
              <Button
                bsSize="sm"
                onClick={props.handleWaitButton}
              >
                I&apos;ll wait
              </Button>
              <Button bsStyle="primary" bsSize="sm" onClick={props.handleManualEntry}>
                Enter Manually
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {!props.nonProcessable && (
        <Row>
          <Col xs={8}>
            <input
              value={props.url}
              placeholder="Recipe URL"
              onChange={props.handleURL}
            />
          </Col>
          <Col xs={4}>
            <Button
              bsStyle="primary"
              onClick={props.submitRecipe}
            >
              Submit
            </Button>
          </Col>
        </Row>
      )}
    </Modal.Body>
  </Modal>
);

SubmitRecipe.propTypes = propTypes;
export default SubmitRecipe;
