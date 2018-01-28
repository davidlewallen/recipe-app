import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components';

describe('Header component', () => {
  let wrapper = null;

  const mockProps = {
    logout: jest.fn(),
    handleModalOpen: jest.fn(),
    isAuth: true,
  };

  beforeEach(() => {
    wrapper = shallow(<Header {...mockProps} />);
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

  it('logo should link to "/dashboard" if isAuth = true', () => {
    expect(wrapper.find('Link').prop('to')).toBe('/dashboard');
  });

  it('logo should link to "/" if isAuth = false', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find('Link').prop('to')).toBe('/');
  })
});
