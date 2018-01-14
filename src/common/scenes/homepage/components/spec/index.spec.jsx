import React from 'react';
import { shallow } from 'enzyme';

import Homepage from '../';

describe('Homepage snapshot test', () => {
  const props = {
    recipeURL: 'www.testrecipeurl.com',
    handleRecipe: () => {},
    submitRecipe: () => {},
    recipeList: [{ title: 'Recipe 1', _id: 1 }, { title: 'Recipe 2', _id: 2 }],
  };

  it('should match snapshot', () => {
    const component = shallow(<Homepage {...props} />);

    expect(component).toMatchSnapshot();
  });
});
