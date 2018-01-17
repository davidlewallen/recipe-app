import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../assets/index.css';

const Homepage = () => (
  <Grid className="homepage align-center">
    <Row>
      <Col xs={12} sm={6} smOffset={3}>
        <h1>My Saved Recipes</h1>
      </Col>
    </Row>
    <Row>
      <Col
        className="login align-center"
        xs={2}
        xsOffset={5}
      >
        <Link
          className="link align-center border"
          to="/account/login"
        >
          Login
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default Homepage;
