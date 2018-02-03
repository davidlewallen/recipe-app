import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <Grid className="homepage">
    <Row>
      <Col
        className="align-center"
        xs={12}
        md={10}
        mdOffset={1}
      >
        <div className="center-vertically">
          <span>My Saved Recipes</span>
          <Link to="/account/login">
            <Button block bsStyle="primary">
              Login
            </Button>
          </Link>
        </div>
      </Col>
    </Row>
  </Grid>
);

export default Homepage;
