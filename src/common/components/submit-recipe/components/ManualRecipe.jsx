import React, { useReducer, useContext } from 'react';
import { func } from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

import { randomKey } from '../../../utils/randomKeys';
import { Recipe } from '../../../utils/api';
import RecipeContext from '../../../context/RecipeContext';

const propTypes = {
  showAuto: func.isRequired,
  handleModalClose: func.isRequired,
};

function ManualRecipe({ showAuto, handleModalClose }) {
  const { setRecipes, recipes } = useContext(RecipeContext);
  const [state, dispatch] = useReducer(
    (reducerState, action) => {
      switch (action.type) {
        case 'SET_TITLE': {
          return { ...reducerState, title: action.payload };
        }
        case 'SET_TIME': {
          return {
            ...reducerState,
            time: { ...reducerState.time, [action.key]: action.payload },
          };
        }
        case 'ADD_ADDITIONAL_INGREDIENT': {
          return {
            ...reducerState,
            ingredients: reducerState.ingredients.concat([
              { key: randomKey(), value: '' },
            ]),
          };
        }
        case 'SET_INGREDIENTS': {
          return { ...reducerState, ingredients: action.payload };
        }
        case 'ADD_ADDITIONAL_INSTRUCTION': {
          return {
            ...reducerState,
            instructions: reducerState.instructions.concat([
              { key: randomKey(), value: '' },
            ]),
          };
        }
        case 'SET_INSTRUCTIONS': {
          return { ...reducerState, instruction: action.payload };
        }
        case 'RESET_STATE': {
          return {
            title: '',
            time: { h: 0, m: 0 },
            instructions: [{ key: randomKey(), value: '' }],
            ingredients: [{ key: randomKey(), value: '' }],
          };
        }

        default: {
          return reducerState;
        }
      }
    },
    {
      title: '',
      time: {
        h: 0,
        m: 0,
      },
      ingredients: [{ key: randomKey(), value: '' }],
      instructions: [{ key: randomKey(), value: '' }],
    }
  );

  const { title, time, ingredients, instructions } = state;

  function handleUpdateIngredient(event, index) {
    const {
      target: { value },
    } = event;
    const ingredientsCopy = ingredients;
    const isLastIngredient = ingredients.length - 1 === index;

    ingredientsCopy[index].value = value;

    dispatch({
      type: 'SET_INGREDIENTS',
      payload: ingredientsCopy,
    });

    if (isLastIngredient) dispatch({ type: 'ADD_ADDITIONAL_INGREDIENT' });
  }

  function handleUpdateInstruction(event, index) {
    const {
      target: { value },
    } = event;
    const instructionsCopy = instructions;
    const isLastInstruction = instructions.length - 1 === index;

    instructionsCopy[index].value = value;

    dispatch({
      type: 'SET_INSTRUCTIONS',
      payload: instructionsCopy,
    });

    if (isLastInstruction) dispatch({ type: 'ADD_ADDITIONAL_INSTRUCTION' });
  }

  function handleUpdateTime(event, key) {
    const {
      target: { value },
    } = event;

    if (value >= 0) {
      dispatch({
        key,
        type: 'SET_TIME',
        payload: value,
      });
    }
  }

  function convertTime() {
    const {
      time: { h, m },
    } = state;

    let hour = '';
    let minute = '';

    switch (h) {
      case 0: {
        hour = '';
        break;
      }
      case 1: {
        hour = '1 hour';
        break;
      }
      default: {
        hour = `${h} hours `;
      }
    }

    switch (m) {
      case 0: {
        minute = '';
        break;
      }
      case 1: {
        minute = '1 minute';
        break;
      }
      default: {
        minute = `${m} minutes`;
      }
    }

    return hour.concat(minute);
  }

  function formatList(list) {
    return list.map(item => item.value);
  }

  async function submitManualRecipe(event) {
    event.preventDefault();
    const body = {
      title,
      ingredients: formatList(ingredients),
      instructions: formatList(instructions),
      totalTime: convertTime(),
    };

    const { data } = await Recipe.manualRecipe(body);

    dispatch({ type: 'RESET_STATE' });
    setRecipes([...recipes, data]);
    handleModalClose();
  }

  return (
    <form onSubmit={submitManualRecipe}>
      <div>
        Manually enter a recipr or click the
        <strong> Auto </strong>
        button below to automatically enter a recipe.
      </div>

      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          placeholder="Example Title"
          value={title}
          onChange={e =>
            dispatch({ type: 'SET_TITLE', payload: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup>
        <Row>
          <Col xs={6}>
            <ControlLabel>Time: Hours</ControlLabel>
            <FormControl
              type="number"
              placeholder="1"
              value={time.h}
              onChange={event => handleUpdateTime(event, 'h')}
            />
          </Col>
          <Col xs={6}>
            <ControlLabel>Time: Minutes</ControlLabel>
            <FormControl
              type="number"
              placeholder="45"
              value={time.m}
              onChange={event => handleUpdateTime(event, 'm')}
            />
          </Col>
        </Row>
      </FormGroup>

      {ingredients.map(({ key, value }, index) => (
        <FormGroup key={key}>
          <ControlLabel>{`Ingredient: ${index + 1}`}</ControlLabel>
          <FormControl
            type="text"
            placeholder="Example Ingredient"
            value={value}
            onChange={event => handleUpdateIngredient(event, index)}
          />
        </FormGroup>
      ))}

      {instructions.map(({ key, value }, index) => (
        <FormGroup key={key}>
          <ControlLabel>{`Instruction: ${index + 1}`}</ControlLabel>
          <FormControl
            type="text"
            placeholder="Example Instruction"
            value={value}
            onChange={event => handleUpdateInstruction(event, index)}
          />
        </FormGroup>
      ))}

      <ButtonToolbar>
        <Button onClick={showAuto}>Auto</Button>
        <Button bsStyle="danger" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button bsStyle="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </form>
  );
}

ManualRecipe.propTypes = propTypes;

export default ManualRecipe;
