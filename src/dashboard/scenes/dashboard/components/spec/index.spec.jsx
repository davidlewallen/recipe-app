import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../';

describe('Dashboard snapshot test', () => {
  const props = {
    recipeURL: 'www.testrecipeurl.com',
    handleRecipe: () => {},
    submitRecipe: () => {},
    deleteRecipe: () => {},
    recipeList: [{ title: 'Recipe 1', _id: 1 }, { title: 'Recipe 2', _id: 2 }],
  };

  it('should match snapshot', () => {
    const component = shallow(<Dashboard {...props} />);

    expect(component).toMatchSnapshot();
  });
});
