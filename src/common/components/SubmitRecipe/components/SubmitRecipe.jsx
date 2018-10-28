import React from 'react';
import { bool, string, func } from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

const propTypes = {
  show: bool.isRequired,
  handleModalClose: func.isRequired,
  submitRecipe: func.isRequired,
  handleURL: func.isRequired,
  url: string.isRequired,
};

const SubmitRecipe = ({
  show,
  handleModalClose,
  url,
  handleURL,
  submitRecipe,
}) => (
  <Modal show={show} onHide={handleModalClose} className="submit">
    <Modal.Header closeButton className="submit__header">
      <Modal.Title className="title">Submit Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body className="submit__body">
      <form>
        <Row>
          <Col xs={12} md={8}>
            <FormGroup className="submit__form-group">
              <ControlLabel>Recipe URL</ControlLabel>
              <FormControl
                className="submit__input"
                value={url}
                onChange={handleURL}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <Button
              className="submit__button"
              block
              bsStyle="primary"
              onClick={submitRecipe}
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </Modal.Body>
  </Modal>
);

SubmitRecipe.propTypes = propTypes;
export default SubmitRecipe;
