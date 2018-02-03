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

const { shape, string } = PropTypes;
const propTypes = {
  user: shape({
    username: string.isRequired,
    email: string.isRequired,
  }).isRequired,
};

const Overview = ({ user }) => (
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
              value={user.username}
            />
            <ControlLabel>Email</ControlLabel>
            <FormControl
              disabled
              type="text"
              value={user.email}
            />
          </FormGroup>
        </form>
      </Col>
    </Row>
  </Grid>
);

Overview.propTypes = propTypes;
export default Overview;
