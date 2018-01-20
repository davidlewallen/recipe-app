import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import '../assets/styles/index.css';

const {
  string, func, arrayOf, object,
} = PropTypes;
const propTypes = {
  recipeURL: string.isRequired,
  handleRecipe: func.isRequired,
  submitRecipe: func.isRequired,
  deleteRecipe: func.isRequired, // eslint-disable-line
  recipeList: arrayOf(object).isRequired,
};

const Dashboard = props => (
  <Grid className="dashboard">
    <Row>
      <Col>
        <form className="submit-recipe align-center my">
          <input
            placeholder="Recipe URL"
            value={props.recipeURL}
            onChange={props.handleRecipe}
          />
          <button
            onClick={props.submitRecipe}
          >
            Submit
          </button>
        </form>
      </Col>
    </Row>

    {props.recipeList.length > 0 && (
      <Row className="recipe-container">
        {props.recipeList.map(recipe => (
          <Col
            className="margin-bottom"
            xs={12}
            sm={6}
            md={3}
          >
            <div className="recipe">
              <Row>
                <Col xs={12} className="card border" key={recipe._id}>
                  <Row>
                    <Col xs={12} className="header align-center">
                      <div>{recipe.title}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="footer">
                      <Row>
                        <Col className="align-center" xs={6}>{recipe.totalTime || 'n/a'}</Col>
                        <Col className="align-center" xs={6}>
                          <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            onClick={() => props.deleteRecipe(recipe._id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    )}
  </Grid>
);

Dashboard.propTypes = propTypes;
export default Dashboard;
