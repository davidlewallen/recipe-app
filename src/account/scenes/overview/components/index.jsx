import React, { useContext } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
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
