import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <Grid className="homepage align-center">
    <Row>
      <Col xs={12}>
        <h1>My Saved Recipes</h1>
      </Col>
    </Row>
    <Row>
      <Col
        className="login align-center"
        xs={12}
      >
        <Link to="/account/login">
          <Button block bsStyle="primary">
            Login
          </Button>
        </Link>
      </Col>
    </Row>
  </Grid>
);

export default Homepage;
