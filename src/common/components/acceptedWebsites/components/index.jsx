// @flow
import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

import genKey from '../../../utils/randomKeys';

import '../assets/styles/index.css';

type Props = {
  show: boolean,
  handleAcceptedModal: () => void,
  acceptedWebsites: Array<String>,
}

const AcceptedWebsites: React$ComponentType<Props> = (props: Props) => (
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
        {props.acceptedWebsites.map((website: String) => (
          <Col
            xs={12}
            key={genKey(website)}
          >
            <div className="website-text">- {website}</div>
          </Col>
        ))}
      </Row>
    </Modal.Body>
  </Modal>
);

export default AcceptedWebsites;
