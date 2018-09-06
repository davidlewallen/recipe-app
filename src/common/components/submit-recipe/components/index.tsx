import * as React from 'react';
import {
  Modal, Row, Col, Button,
} from 'react-bootstrap';

import { IPropTypes } from './types';

import '../assets/styles/index.css';

const SubmitRecipe: React.StatelessComponent<IPropTypes> = ({
  show, handleModalClose, url, handleURL, submitRecipe,
}) => (
  <Modal
    show={show}
    onHide={handleModalClose}
    className="submit-recipe-modal"
  >
    <Modal.Header closeButton className="header">
      <Modal.Title className="title">
        Submit Recipe
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="body">
      <Row>
        <Col xs={12} md={8}>
          <input
            value={url}
            placeholder="Recipe URL"
            onChange={handleURL}
          />
        </Col>
        <Col xs={12} md={4}>
          <Button
            block
            bsStyle="primary"
            onClick={submitRecipe}
            type="button"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default SubmitRecipe;
