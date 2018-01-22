import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../';

describe('Dashboard snapshot test', () => {
  const props = {
    recipeURL: 'www.testrecipeurl.com',
    handleRecipe: () => {},
    submitRecipe: () => {},
    deleteRecipe: () => {},
    recipeList: [
      { title: 'Recipe 1', _id: 1, totalTime: '1 hour 10 minutes' },
      { title: 'Recipe 2', _id: 2 },
    ],
    showModal: false,
    handleModalClose: jest.fn(),
    selectedRecipe: {
      title: 'title',
      ingredients: ['1'],
      instructions: ['2'],
      totalTime: '1 hour',
      url: { href: 'www.randomurl.com' },
    },
  };

  it('should match snapshot', () => {
    const component = shallow(<Dashboard {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should display "n/a" for time if totalTime is undefined', () => {
    const component = shallow(<Dashboard {...props} recipeList={[{ title: 'Recipe', _id: 1 }]} />);
    const recipe = component.find('.recipe');
    const footer = recipe.find('.footer');
    const time = footer.find('Col');

    expect(time.children().at(1).text()).toBe('n/a');
  });
});
