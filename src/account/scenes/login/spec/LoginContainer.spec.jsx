import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import LoginContainer from '../container/LoginContainer';

import { Account } from '../../../../common/utils/api';

const mock = new MockAdapter(axios);

describe('LoginContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockState = {
    email: 'test@test.com',
    password: 'testPassword',
    error: {
      value: false,
      message: '',
    },
  };

  const mockProps = {
    ...mockHistory,
    updateAuth: jest.fn(),
  };

  let wrapper = null;
  let instance = null;

  const clog = console.log;

  beforeEach(() => {
    window.console.log = clog;
    jest.resetAllMocks();

    mock.reset();

    mock.onPost('/api/account/login').reply(200, true);

    wrapper = shallow(<LoginContainer {...mockProps} />);
    instance = wrapper.instance();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('login', () => {
    it('should call login', () => {
      const spy = jest.spyOn(instance, 'login');

      mock.onPost('/api/account/login').reply(200);

      instance.login({ preventDefault: jest.fn() });

      expect(spy).toHaveBeenCalled();
    });

    it("should log into an account and redirect to '/'", async () => {
      mock.onPost('/api/account/login').reply(200, {
        savedRecipes: [],
        _id: 1,
        email: 'test@test.com',
      });

      instance.setState(mockState);

      await instance.login({ preventDefault: jest.fn() });

      expect(instance.props.history.replace).toHaveBeenCalledWith('/dashboard');
    });

    it('should update error state with 400s', async () => {
      mock.reset();
      mock.onPost('/api/account/login').reply(400, { message: 'error' });

      await instance.login({ preventDefault: jest.fn() });

      expect(instance.state.error).toEqual({ value: true, message: 'error' });
    });

    it('should redirect to "/account/verify" if status is 403 and verified is false', async () => {
      mock.onPost(Account.endpoints.login).reply(403, { verified: false });

      await instance.login({ preventDefault: jest.fn() });

      expect(mockProps.history.replace).toHaveBeenCalledWith('/account/verify');
    });
  });

  describe('handleInputChange', () => {
    it('should update email state', () => {
      const expectedState = 'test';

      instance.handleInputChange({
        target: { name: 'email', value: expectedState },
      });

      expect(wrapper.state('email')).toEqual(expectedState);
    });

    it('should update password state', () => {
      const expectedState = 'test';

      instance.handleInputChange({
        target: { name: 'password', value: expectedState },
      });

      expect(wrapper.state('password')).toEqual(expectedState);
    });
  });
});
