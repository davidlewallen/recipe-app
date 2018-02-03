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
    wrapper.find('NavItem').at(2).simulate('click');
    expect(mockProps.logout).toHaveBeenCalledTimes(1);
  });

  it('logo should link to "/dashboard" if isAuth is true', () => {
    expect(wrapper.find('Link').prop('to')).toBe('/dashboard');
    expect(wrapper).toMatchSnapshot();
  });

  it('logo should link to "/" if isAuth is false', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find('Link').prop('to')).toBe('/');
    expect(wrapper).toMatchSnapshot();
  });

  it('should not display menu if isAuth is false', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find('NavbarToggle').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display menu if isAuth is true', () => {
    expect(wrapper.find('NavbarToggle').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not display + Add Recipe, Account, and Logout if isAuth is false', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find('NavbarCollapse').exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });

  fit('should display + Add Recipe, Account, Logout if isAuth is true', () => {
    expect(wrapper.find('NavbarCollapse').exists()).toBe(true);
    expect(wrapper.find('NavItem').length).toBe(3);
    expect(wrapper.find('NavItem').at(0).prop('children')).toEqual('+ Add Recipe');
    expect(wrapper.find('NavItem').at(1).prop('children')).toEqual('Account');
    expect(wrapper.find('NavItem').at(2).prop('children')).toEqual('Logout');
    expect(wrapper).toMatchSnapshot();
  });
});
