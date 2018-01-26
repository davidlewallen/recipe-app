import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components';

describe('Header component', () => {
  let wrapper = null;
  let instance = null;

  const mockProps = {
    logout: jest.fn(),
    handleModalOpen: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Header {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call props.handleModalOpen when a use clicks "+ Add Recipe"', () => {
    wrapper.find('NavItem').at(0).simulate('click');
    expect(mockProps.handleModalOpen).toHaveBeenCalledTimes(1);
  });

  it('should call props.logout when a user clicks "Logout"', () => {
    wrapper.find('NavItem').at(1).simulate('click');
    expect(mockProps.logout).toHaveBeenCalledTimes(1);
  });
});
