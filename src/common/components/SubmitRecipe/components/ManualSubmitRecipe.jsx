import React from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import FieldGroup from '../../FieldGroup';

import genKey from '../../../utils/randomKeys';

const propTypes = {
  url: string.isRequired,
  handleManualModalClose: func.isRequired,
  handleInputChange: func.isRequired,
  handleIngredientInstructionChange: func.isRequired,
  manualRecipe: shape({
    title: string.isRequired,
    instructions: arrayOf(string).isRequired,
    ingredients: arrayOf(string).isRequired,
  }).isRequired,
};

const ManualSubmitRecipe = ({
  url,
  handleManualModalClose,
  handleInputChange,
  handleIngredientInstructionChange,
  manualRecipe: { title, instructions, ingredients },
}) => (
  <Modal show onHide={handleManualModalClose} className="submit">
    <Modal.Header closeButton className="submit__header">
      <Modal.Title className="title">Manual Recipe Submit</Modal.Title>
    </Modal.Header>
    <Modal.Body className="submit__body">
      <form>
        <Row>
          <Col xs={12} md={8}>
            <FieldGroup
              id="recipe-url"
              name="url"
              value={url}
              label="Recipe URL"
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={8}>
            <FieldGroup
              id="recipe-title"
              data-key="manualRecipe"
              name="title"
              value={title}
              label="Recipe Title"
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={12} md={8}>
            <FieldGroup
              id="recipe-instruction-0"
              data-key="manualRecipe"
              data-index="0"
              name="instructions"
              value={instructions[0]}
              label="Instruction 1"
              onChange={handleIngredientInstructionChange}
            />
          </Col>

          {instructions
            .filter((instruction, index) => index !== 0)
            .map((instruction, index) => (
              <Col xs={12} md={8} key={genKey(index)}>
                <FieldGroup
                  id={`recipe-instruction-${index}`}
                  data-key="manualRecipe"
                  data-index={index}
                  name="instructions"
                  value={instruction}
                  label={`Instruction ${index + 1}`}
                  onChange={handleIngredientInstructionChange}
                />
              </Col>
            ))}

          <Col xs={12} md={8}>
            <FieldGroup
              id="recipe-ingredient-0"
              data-key="manualRecipe"
              data-index="0"
              name="ingredients"
              value={ingredients[0]}
              label="Ingredient 1"
              onChange={handleIngredientInstructionChange}
            />
          </Col>
          {ingredients
            .filter((ingredient, index) => index !== 0)
            .map((ingredient, index) => (
              <Col xs={12} md={8} key={genKey(index)}>
                <FieldGroup
                  id={`recipe-ingredient-${index}`}
                  data-key="manualRecipe"
                  data-index={index}
                  name="ingredients"
                  value={ingredient}
                  label={`ingredient ${index + 1}`}
                  onChange={handleIngredientInstructionChange}
                />
              </Col>
            ))}
          <Col xs={12} md={4}>
            <Button
              className="submit__button"
              block
              bsStyle="primary"
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </Modal.Body>
  </Modal>
);

ManualSubmitRecipe.propTypes = propTypes;
export default ManualSubmitRecipe;
