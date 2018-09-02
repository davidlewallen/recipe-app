import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Jumbotron } from 'react-bootstrap';

import RecipeModal from '../../../components/recipe-modal/components';

import '../assets/styles/index.css';
import noImage from '../../../../common/assets/noImage.png';

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
  viewRecipe: func.isRequired,// eslint-disable-line
  searchValue: string.isRequired,
  handleSearch: func.isRequired,
};

const Dashboard = props => (
  <Grid className="dashboard">
    <RecipeModal
      showModal={props.showModal}
      handleModalClose={props.handleModalClose}
      selectedRecipe={props.selectedRecipe}
      deleteRecipe={props.deleteRecipe}
    />

    {!props.recipes.length ? (
      <Row>
        <Col xs={12}>
          <Jumbotron className="align-center">
            <p>Looks like you have no recipes currently saved. You should add some!</p>
            <p>To add recipes, click the menu button and select &quot;+ Add Recipe&quot;.</p>
          </Jumbotron>
        </Col>
      </Row>
    ) : (
      <Row className="recipe-container">
        <Col xs={12} className="recipe-search">
          <input
            placeholder="Search..."
            value={props.searchValue}
            onChange={props.handleSearch}
          />
        </Col>
        {props.recipes.map(recipe =>
          recipe.title.toLowerCase().includes(props.searchValue.toLowerCase()) && (
            <Col
              className="margin-bottom"
              xs={12}
              sm={6}
              md={3}
              key={recipe._id}
            >
              <div className="recipe">
                <Row>
                  <Col xs={12} className="card">
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
                            src={recipe.imageURL ? recipe.imageURL : noImage}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="footer align-center">
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
          ),
        )}
      </Row>
    )}
  </Grid>
);

Dashboard.propTypes = propTypes;
export default Dashboard;
