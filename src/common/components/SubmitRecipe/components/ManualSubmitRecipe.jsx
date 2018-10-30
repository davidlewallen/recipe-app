import React from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import FieldGroup from '../../FieldGroup';

import { ReactComponent as Plus } from '../../../assets/icons/plus.svg';
import { ReactComponent as Minus } from '../../../assets/icons/minus.svg';

import genKey from '../../../utils/randomKeys';

const propTypes = {
  url: string.isRequired,
  handleInputChange: func.isRequired,
  handleIngredientInstructionChange: func.isRequired,
  handleAddInput: func.isRequired,
  handleRemoveInput: func.isRequired,
  handleCancelRecipe: func.isRequired,
  manualRecipe: shape({
    title: string.isRequired,
    instructions: arrayOf(string).isRequired,
    ingredients: arrayOf(string).isRequired,
  }).isRequired,
};

const ManualSubmitRecipe = ({
  url,
  handleInputChange,
  handleIngredientInstructionChange,
  handleAddInput,
  handleRemoveInput,
  handleCancelRecipe,
  manualRecipe: { title, instructions, ingredients },
}) => (
  <Modal show onHide={handleCancelRecipe} className="submit">
    <Modal.Header closeButton className="submit__header">
      <Modal.Title className="title">Manual Recipe Submit</Modal.Title>
    </Modal.Header>
    <Modal.Body className="submit__body">
      <form>
        <FieldGroup
          id="recipe-url"
          name="url"
          value={url}
          label="Recipe URL"
          onChange={handleInputChange}
        />
        <FieldGroup
          id="recipe-title"
          data-key="manualRecipe"
          name="title"
          value={title}
          label="Recipe Title"
          onChange={handleInputChange}
        />

        <Row>
          {ingredients.map((ingredient, index) => (
            <Col xs={12} key={genKey(`ingredient-${index}`)}>
              <div className="submit__field-group-wrapper">
                <FieldGroup
                  id={`recipe-ingredient-${index}`}
                  label={`Ingredient ${index + 1}:`}
                  data-key="manualRecipe"
                  data-index={index}
                  name="ingredients"
                  value={ingredient}
                  onChange={handleIngredientInstructionChange}
                  autoComplete="off"
                />

                <div className="submit__plus-minus">
                  <Button
                    type="button"
                    onClick={() => handleAddInput('ingredients', index)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    type="button"
                    disabled={ingredients < 2}
                    onClick={() => handleRemoveInput('ingredients', index)}
                  >
                    <Minus />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row id="instructions-list">
          {instructions.map((instruction, index) => (
            <Col xs={12} key={genKey(`instruction-${index}`)}>
              <div className="submit__field-group-wrapper">
                <FieldGroup
                  id={`recipe-instruction-${index}`}
                  label={`Instruction ${index + 1}:`}
                  data-key="manualRecipe"
                  data-index={index}
                  name="instructions"
                  value={instruction}
                  onChange={handleIngredientInstructionChange}
                  autoComplete="off"
                />

                <div className="submit__plus-minus">
                  <Button
                    type="button"
                    onClick={() => handleAddInput('instructions', index)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    type="button"
                    disabled={instructions < 2}
                    onClick={() => handleRemoveInput('instructions', index)}
                  >
                    <Minus />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="submit__button-group">
          <Col xs={12} sm={6} smPush={6}>
            <Button
              className="submit__button"
              block
              bsStyle="primary"
              type="submit"
            >
              Submit
            </Button>
          </Col>
          <Col xs={12} sm={6} smPull={6}>
            <Button
              className="submit__button"
              block
              bsStyle="danger"
              type="reset"
              onClick={handleCancelRecipe}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </Modal.Body>
  </Modal>
);

ManualSubmitRecipe.propTypes = propTypes;
export default ManualSubmitRecipe;
