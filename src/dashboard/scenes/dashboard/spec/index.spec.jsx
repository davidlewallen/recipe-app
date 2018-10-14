import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../components';

describe('Dashboard snapshot test', () => {
  const props = {
    showModal: false,
    deleteRecipe: jest.fn(),
    viewRecipe: jest.fn(),
    handleModalClose: jest.fn(),
    recipes: [
      {
        title: 'Recipe 1',
        _id: 1,
        totalTime: '1 hour 10 minutes',
        imageURL: 'randomimg',
      },
      {
        title: 'Recipe 2',
        _id: 2,
        imageURL: 'randomimg2',
      },
    ],
    selectedRecipe: {
      title: 'title',
      ingredients: ['1'],
      instructions: ['2'],
      totalTime: '1 hour',
      url: { href: 'www.randomurl.com' },
    },
    loading: false,
    loadingRecipes: false,
    searchValue: '',
    handleSearch: jest.fn(),
  };

  it('should match snapshot', () => {
    const component = shallow(<Dashboard {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(<Dashboard {...props} />);
    expect(component).toBeTruthy();
  });

  it('should render Jumbotron with no recipe text if recipes length is falsy and loading is falsy', () => {
    const component = shallow(<Dashboard {...props} recipes={[]} />);
    expect(component.find('Jumbotron').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should render a .recipe-container if recipes length is truthy', () => {
    const component = shallow(<Dashboard {...props} />);
    const recipeContainer = component.find('.recipe-container');
    expect(recipeContainer.length).toBe(1);
  });

  it('should not render a .recipe-container if recipes length === 0', () => {
    const component = shallow(<Dashboard {...props} recipes={[]} />);
    const recipeContainer = component.find('.recipe-container');
    expect(recipeContainer.length).toBe(0);
  });

  it('should render multiple recipes', () => {
    const component = shallow(<Dashboard {...props} />);
    const recipes = component.find('.recipe');
    expect(recipes.length).toBe(2);
  });

  it('should render filtered recipes based on recipe title', () => {
    const component = shallow(<Dashboard {...props} />);
    expect(component.find('div.recipe').length).toBe(2);
    component.setProps({ searchValue: 'Recipe 1' });
    expect(component.find('div.recipe').length).toBe(1);
    expect(
      component
        .find('div.recipe')
        .find('div')
        .at(1)
        .text()
    ).toBe(props.recipes[0].title);
  });

  it('should display the title', () => {
    const component = shallow(<Dashboard {...props} />);
    const title = component
      .find('.header')
      .at(0)
      .childAt(0);
    expect(title.text()).toBe(props.recipes[0].title);
  });

  it('should render img with recipe image and an alt', () => {
    const component = shallow(<Dashboard {...props} />);
    const img = component.find('img').at(0);
    expect(img.props().src).toBe(props.recipes[0].imageURL);
    expect(img.props().alt).toBe(props.recipes[0].title);
  });

  it('should should call viewRecipe with the recipe when the View button is clicked', () => {
    const component = shallow(<Dashboard {...props} />);
    const button = component.find('Button').at(0);
    button.simulate('click');
    expect(props.viewRecipe).toHaveBeenCalledWith(props.recipes[0]);
  });

  it('should display "n/a" for time if totalTime is undefined', () => {
    const component = shallow(
      <Dashboard {...props} recipes={[{ title: 'Recipe', _id: 1 }]} />
    );
    const recipe = component.find('.recipe');
    const footer = recipe.find('.footer');
    const time = footer.find('Col');

    expect(
      time
        .children()
        .at(1)
        .text()
    ).toBe('n/a');
  });

  it('should should call deleteRecipe with the recipe id when the Delete button is clicked', () => {
    const component = shallow(<Dashboard {...props} />);
    const button = component.find('Button').at(1);
    button.simulate('click');
    expect(props.deleteRecipe).toHaveBeenCalledWith(props.recipes[0]._id);
  });

  it('should render noImage if imageURL is empty', () => {
    const component = shallow(
      <Dashboard
        {...props}
        recipes={[{ title: 'Recipe', _id: 1, imageURL: '' }]}
      />
    );

    expect(
      component
        .find('img')
        .at(0)
        .prop('src')
    ).toBe('noImage.png');
  });
});
