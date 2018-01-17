import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import '../assets/index.css';

const Homepage = () => (
  <Grid fluid bsClass="container">
    <Row>
      <Col xs={6} xsOffset={3}>
        <div className="title">My Saved Recipes</div>
      </Col>
    </Row>
    <Row>
      <Col xs={2} xsOffset={5} bsClass="login-col">
        <div className="login">Login</div>
      </Col>
    </Row>
  </Grid>
);

export default Homepage;
