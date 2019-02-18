import React from 'react';
import { arrayOf, string, func, bool } from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import genKey from '../../../utils/randomKeys';

import '../assets/styles/index.css';

const propTypes = {
  show: bool.isRequired,
  handleAcceptedModal: func.isRequired,
  acceptedWebsites: arrayOf(string.isRequired).isRequired,
};

const AcceptedWebsites = ({ show, handleAcceptedModal, acceptedWebsites }) => (
  <Modal
    show={show}
    onHide={handleAcceptedModal}
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
            {"If a website isn't listed," +
              'go ahead and "+ Add Recipe" and our team will be notified.'}
          </div>
        </Col>
      </Row>
      <Row className="website-list">
        {acceptedWebsites.map(website => (
          <Col xs={12} key={genKey(website)}>
            <div className="website-text">
              {'- '}
              {website}
            </div>
          </Col>
        ))}
      </Row>
    </Modal.Body>
  </Modal>
);

AcceptedWebsites.propTypes = propTypes;
export default AcceptedWebsites;
