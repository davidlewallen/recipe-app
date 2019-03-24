import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

import '../assets/styles/index.css';

const Homepage = () => (
  <Grid className="homepage">
    <Row>
      <Col className="align-center" xs={12} md={10} mdOffset={1}>
        <div className="center-vertically">
          <span>My Saved Recipes</span>
          <Link to="/account/login">
            <Button block bsStyle="primary" type="button">
              Login
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  </Grid>
);

export default Homepage;
