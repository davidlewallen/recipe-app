import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from 'react-bootstrap';

const { bool, string, func } = PropTypes;
const propTypes = {
  show: bool.isRequired,
  handleModalClose: func.isRequired,
  submitRecipe: func.isRequired,
  handleURL: func.isRequired,
  url: string.isRequired,
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
      <Row>
        <Col xs={12} md={8}>
          <input
            value={props.url}
            placeholder="Recipe URL"
            onChange={props.handleURL}
          />
        </Col>
        <Col xs={12} md={4}>
          <Button onClick={props.submitRecipe}>
            Submit
          </Button>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

SubmitRecipe.propTypes = propTypes;
export default SubmitRecipe;
