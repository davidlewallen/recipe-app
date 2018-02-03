import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

const { string } = PropTypes;
const propTypes = {
  username: string.isRequired,
  email: string.isRequired,
};

const Overview = ({ username, email }) => (
  <Grid className="overview">
    <Row>
      <Col xs={12}>
        <form>
          <FormGroup
            controlId="formAccountInfo"
          >
            <ControlLabel>Username</ControlLabel>
            <FormControl
              disabled
              type="text"
              value={username}
            />
            <ControlLabel>Email</ControlLabel>
            <FormControl
              disabled
              type="text"
              value={email}
            />
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

Overview.propTypes = propTypes;
export default Overview;
