import React from 'react';
import { shallow } from 'enzyme';

import SubmitRecipe from '../SubmitRecipe';

describe('SubmitRecipe component', () => {
  let wrapper = null;

  const mockProps = {
    show: false,
    handleModalClose: jest.fn(),
    submitRecipe: jest.fn(),
    handleURL: jest.fn(),
    url: '',
  };

  beforeEach(() => {
    wrapper = shallow(<SubmitRecipe {...mockProps} />);
  });

  it('should render and match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
