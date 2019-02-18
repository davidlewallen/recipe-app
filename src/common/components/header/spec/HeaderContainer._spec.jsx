import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import HeaderContainer from '../container/HeaderContainer';

const mock = new MockAdapter(axios);

describe('HeaderContainer', () => {
  const mockHistory = { history: { replace: jest.fn() } };

  const props = {
    ...mockHistory,
    updateRecipes: jest.fn(),
    recipes: [],
    isAuth: true,
    updateAuth: jest.fn(),
  };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    jest.resetAllMocks();

    mock.reset();
    mock.onGet('/api/approved').reply(200, ['test', 'test2']);

    wrapper = shallow(<HeaderContainer {...props} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('logout', () => {
    it('should call logout', () => {
      mock.onGet('/api/account/logout').reply(200);
      const spy = jest.spyOn(instance, 'logout');
      instance.logout();
      expect(spy).toHaveBeenCalled();
    });

    it("should redirect to '/'", async () => {
      mock.onGet('/api/account/logout').reply(200);
      await instance.logout();
      expect(instance.props.history.replace).toHaveBeenCalledWith('/');
    });
  });

  describe('handleModalOpen', () => {
    it('should set showModal state to true when called', () => {
      const spy = jest.spyOn(instance, 'handleModalOpen');
      instance.handleModalOpen();
      expect(spy).toHaveBeenCalled();
      expect(instance.state.showModal).toBe(true);
    });
  });

  describe('handleModalClose', () => {
    it('should set showModal state to false when called', () => {
      const spy = jest.spyOn(instance, 'handleModalClose');
      instance.handleModalClose();
      expect(spy).toHaveBeenCalled();
      expect(instance.state.showModal).toBe(false);
    });
  });

  describe('handleAcceptedModal', () => {
    it('should set showAcceptedModal to true if false and false if true', () => {
      expect(instance.state.showAcceptedModal).toBe(false);
      instance.handleAcceptedModal();
      expect(instance.state.showAcceptedModal).toBe(true);
      instance.handleAcceptedModal();
      expect(instance.state.showAcceptedModal).toBe(false);
    });
  });
});
