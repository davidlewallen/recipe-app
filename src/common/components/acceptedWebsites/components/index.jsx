import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col } from 'react-bootstrap';

import genKey from '../../../utils/randomKeys';

import '../assets/styles/index.css';

const {
  arrayOf,
  string,
  func,
  bool,
} = PropTypes;
const propTypes = {
  show: bool.isRequired,
  handleAcceptedModal: func.isRequired,
  acceptedWebsites: arrayOf(string.isRequired).isRequired,
};

const AcceptedWebsites = props => (
  <Modal
    show={props.show}
    onHide={props.handleAcceptedModal}
    className="accepted-websites-modal"
  >
    <Modal.Header closeButton className="header">
      <Modal.Title className="title">Accepted Websites</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col xs={12}>
          <div>These are the websites that we can process at this moment</div>
          <div>
            If a website isn&apos;t listed, go ahead and &quot;+ Add Recipe&quot;
            and our team will be notified.
          </div>
        </Col>
      </Row>
      <Row className="website-list">
        {props.acceptedWebsites.map(website => (
          <Col
            className="align-center"
            xs={12}
            key={genKey(website)}
          >
            <div className="website-text">{website}</div>
          </Col>
        ))}
      </Row>
    </Modal.Body>
  </Modal>
);

AcceptedWebsites.propTypes = propTypes;
export default AcceptedWebsites;
