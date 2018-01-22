import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import RecipeModal from '../../../components/recipe-modal/components';

import '../assets/styles/index.css';

const {
  string,
  func,
  arrayOf,
  object,
  bool,
  shape,
} = PropTypes;
const propTypes = {
  deleteRecipe: func.isRequired, // eslint-disable-line
  recipes: arrayOf(object).isRequired,
  showModal: bool.isRequired,
  handleModalClose: func.isRequired,
  selectedRecipe: shape({
    title: string,
    ingredients: arrayOf(string),
    instructions: arrayOf(string),
    totalTime: string,
    url: shape({ href: string.isRequired }).isRequired,
  }).isRequired,
};

const Dashboard = props => (
  <Grid className="dashboard">
    <RecipeModal
      showModal={props.showModal}
      handleModalClose={props.handleModalClose}
      selectedRecipe={props.selectedRecipe}
      deleteRecipe={props.deleteRecipe}
    />

    {props.recipes.length > 0 && (
      <Row className="recipe-container">
        {props.recipes.map(recipe => (
          <Col
            className="margin-bottom"
            xs={12}
            sm={6}
            md={3}
          >
            <div className="recipe">
              <Row>
                <Col xs={12} className="card" key={recipe._id}>
                  <Row>
                    <Col xs={12} className="header align-center">
                      <div>{recipe.title}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className="image-container">
                        <img
                          className="recipe-image"
                          alt={recipe.title}
                          src={recipe.imageURL}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="footer">
                      <Button
                        className="float-left"
                        bsStyle="primary"
                        bsSize="xsmall"
                        onClick={() => props.viewRecipe(recipe)}
                      >
                        View
                      </Button>
                      {recipe.totalTime || 'n/a'}
                      <Button
                        className="float-right"
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
            </div>
          </Col>
        ))}
      </Row>
    )}
  </Grid>
);

Dashboard.propTypes = propTypes;
export default Dashboard;
