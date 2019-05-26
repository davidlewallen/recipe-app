import React, { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Collapse from 'react-bootstrap/lib/Collapse';

import ManualRecipe from './components/ManualRecipe';
import AutoRecipe from './components/AutoRecipe';

const propTypes = {
  show: bool.isRequired,
  handleModalClose: func.isRequired,
};

function SubmitRecipe({ show, handleModalClose }) {
  const [autoIsExpanded, setAutoIsExpanded] = useState(true);
  const [manualIsExpanded, setManualIsExpanded] = useState(false);

  function showAuto() {
    setAutoIsExpanded(true);
    setManualIsExpanded(false);
  }

  function showManual() {
    setAutoIsExpanded(false);
    setManualIsExpanded(true);
  }

  useEffect(() => {
    showAuto();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      className="submit-recipe-modal"
    >
      <Modal.Header closeButton className="header">
        <Modal.Title className="title">Submit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        <Collapse in={autoIsExpanded}>
          <div>
            <AutoRecipe
              showManual={showManual}
              handleModalClose={handleModalClose}
            />
          </div>
        </Collapse>

        <Collapse in={manualIsExpanded}>
          <div>
            <ManualRecipe
              showAuto={showAuto}
              handleModalClose={handleModalClose}
            />
          </div>
        </Collapse>
      </Modal.Body>
    </Modal>
  );
}

SubmitRecipe.propTypes = propTypes;
export default SubmitRecipe;
