import React from 'react';
import { shallow } from 'enzyme';

import RecipeModal from '../components';

describe('RecipeModal component', () => {
  const props = {
    showModal: false,
    handleModalClose: jest.fn(),
    selectedRecipe: {
      title: 'test',
      ingredients: ['1'],
      instructions: ['1'],
      totalTime: '1 hour',
      url: {
        href: 'randomurl.com',
      },
    },
    deleteRecipe: jest.fn(),
  };

  it('should match snapshot', () => {
    const component = shallow(<RecipeModal {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should match snapshot with modal open', () => {
    const component = shallow(<RecipeModal {...props} showModal />);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(<RecipeModal {...props} />);
    expect(component).toBeTruthy();
  });

  it('should display total time', () => {
    const component = shallow(<RecipeModal {...props} />);
    const time = component.find('span.total-time');

    expect(time.text()).toBe(`Total Time: ${props.selectedRecipe.totalTime}`);
  });

  it('should display "n/a" if total time isnt provided', () => {
    const modifiedProps = props;
    delete modifiedProps.selectedRecipe.totalTime;

    const component = shallow(<RecipeModal {...modifiedProps} />);
    const time = component.find('span.total-time');
    expect(time.text()).toBe('Total Time: n/a');
  });

  it('should render multiple ingredients', () => {
    const modifiedProps = props;
    modifiedProps.selectedRecipe.ingredients.push('1');

    const component = shallow(<RecipeModal {...modifiedProps} />);
    const ingredients = component.find('div.ingredient');
    expect(ingredients.length).toBe(2);
  });

  it('should render multiple instructions', () => {
    const modifiedProps = props;
    modifiedProps.selectedRecipe.instructions.push('1');

    const component = shallow(<RecipeModal {...modifiedProps} />);
    const instructions = component.find('div.instruction');
    expect(instructions.length).toBe(2);
  });

  it('should render a title', () => {
    const component = shallow(<RecipeModal {...props} />);
    const title = component.find('.title').childAt(0);
    expect(title.text()).toBe(props.selectedRecipe.title);
  });

  it('should link to the original recipe website', () => {
    const component = shallow(<RecipeModal {...props} />);
    const link = component.find('a.recipe-link');
    expect(link.props().href).toBe(props.selectedRecipe.url.href);
  });

  it('should call deleteRecipe with recipe id when delete button is pressed', () => {
    const component = shallow(<RecipeModal {...props} />);
    const button = component.find('Button');
    expect(props.deleteRecipe).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(props.deleteRecipe).toHaveBeenCalledWith(props.selectedRecipe._id);
  });
});
