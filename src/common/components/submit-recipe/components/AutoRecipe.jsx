import React, { useState, useContext } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import { func } from 'prop-types';

import { Recipe } from '../../../utils/api';
import RecipeContext from '../../../context/RecipeContext';

const propTypes = {
  showManual: func.isRequired,
  handleModalClose: func.isRequired,
};

function AutoRecipe({ showManual, handleModalClose }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { setRecipes, recipes } = useContext(RecipeContext);

  async function submitAutoRecipe(event) {
    event.preventDefault();
    const encodedURL = encodeURIComponent(url);

    try {
      setLoading(true);
      const { data } = await Recipe.submitRecipe(encodedURL);

      if (!data.alreadyAdded) {
        setUrl('');
        setRecipes([...recipes, data]);
      }

      handleModalClose();
    } catch (err) {
      alert(
        'We cannot process this website currently. Click Manual to manually add the recipe'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        {`Add a website's URL to automatically save recipe or click the`}
        <strong> Manual </strong>
        button below to manually enter a recipe.
      </div>

      <form onSubmit={submitAutoRecipe}>
        <FormGroup>
          <ControlLabel>Website URL</ControlLabel>
          <FormControl
            value={url}
            type="text"
            placeholder="www.example-recipe.com"
            onChange={event => setUrl(event.target.value)}
          />
        </FormGroup>

        <ButtonToolbar>
          <Button onClick={showManual} disabled={loading}>
            Manual
          </Button>
          <Button
            bsStyle="danger"
            onClick={handleModalClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button bsStyle="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </ButtonToolbar>
      </form>
    </>
  );
}

AutoRecipe.propTypes = propTypes;

export default AutoRecipe;
