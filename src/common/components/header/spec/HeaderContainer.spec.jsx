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

    it('should redirect to \'/\'', async () => {
      mock.onGet('/api/account/logout').reply(200);
      await instance.logout();
      expect(instance.props.history.replace).toHaveBeenCalledWith('/');
    });
  });
});
