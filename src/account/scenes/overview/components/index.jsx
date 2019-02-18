import React, { useContext } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import UserContext from '../../../../common/context/UserContext';

import '../assets/styles/index.css';

function Overview() {
  const {
    userAuth,
    user: { username, email },
  } = useContext(UserContext);

  if (!userAuth) {
    return <Redirect to="/account/login" />;
  }

  return (
    <Grid className="overview">
      <Row>
        <Col xs={12} md={4} mdOffset={4}>
          <form>
            <FormGroup controlId="formAccountInfo">
              <ControlLabel>Username</ControlLabel>
              <FormControl disabled type="text" value={username} />
              <ControlLabel>Email</ControlLabel>
              <FormControl disabled type="text" value={email} />
            </FormGroup>
          </form>
        </Col>
      </Row>
    </Grid>
  );
}

export default Overview;
