import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

import '../assets/styles/index.css';
import RecipeModal from '../../../components/recipe-modal/components';
import noImage from '../../../../common/assets/noImage.png';
import RecipeContext from '../../../../common/context/RecipeContext';
import UserContext from '../../../../common/context/UserContext';
import { Recipe } from '../../../../common/utils/api';

const DashboardContainer = () => {
  const history = useHistory();
  const recipeContext = useContext(RecipeContext);
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({
    _id: 0,
    title: '',
    ingredients: [],
    instructions: [],
    url: { href: '' },
  });

  useEffect(() => {
    async function fetchRecipes() {
      setLoadingRecipes(true);
      const { setRecipes } = recipeContext;
      const { data: recipes } = await Recipe.getRecipes();

      setRecipes(recipes);

      setLoadingRecipes(false);
    }

    fetchRecipes();
  }, []);

  const deleteRecipe = async recipeId => {
    const { setRecipes } = recipeContext;
    const { data: recipes } = await Recipe.deleteRecipe(recipeId);

    setRecipes(recipes);
  };

  const handleModalClose = () => setShowModal(false);

  const viewRecipe = recipe => {
    setShowModal(true);
    setSelectedRecipe(recipe);
  };

  const handleSearch = event => setSearchValue(event.target.value);

  if (!userContext.userAuth) history.push('/account/login');

  return (
    <Grid className="dashboard">
      <RecipeModal
        showModal={showModal}
        handleModalClose={handleModalClose}
        selectedRecipe={selectedRecipe}
        deleteRecipe={deleteRecipe}
      />

      {!recipeContext.recipes.length && !loadingRecipes ? (
        <Row>
          <Col xs={12}>
            <Jumbotron className="NoRecipes align-center">
              <p className="NoRecipes__Copy">
                Looks like you have no recipes currently saved. You should add
                some!
              </p>
              <p className="NoRecipes__Copy">
                To add recipes, click the menu button and select &quot;+ Add
                Recipe&quot;.
              </p>
            </Jumbotron>
          </Col>
        </Row>
      ) : (
        <Row className="recipe-container">
          <Col xs={12} className="recipe-search">
            <input
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
            />
          </Col>
          {recipeContext.recipes.map(
            recipe =>
              recipe.title
                .toLowerCase()
                .includes(searchValue.toLowerCase()) && (
                <Col
                  className="margin-bottom"
                  xs={12}
                  sm={6}
                  md={3}
                  // eslint-disable-next-line no-underscore-dangle
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
                                src={
                                  recipe.imageURL ? recipe.imageURL : noImage
                                }
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
                              onClick={() => viewRecipe(recipe)}
                            >
                              View
                            </Button>
                            {recipe.totalTime || 'n/a'}
                            <Button
                              className="float-right"
                              bsStyle="danger"
                              bsSize="xsmall"
                              // eslint-disable-next-line no-underscore-dangle
                              onClick={() => deleteRecipe(recipe._id)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
          )}
        </Row>
      )}
    </Grid>
  );
};

export default DashboardContainer;
