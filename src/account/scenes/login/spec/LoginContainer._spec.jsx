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
    username: 'testUsername',
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
      mock.onPost('/api/account/login').reply(200);
      const spy = jest.spyOn(instance, 'login');
      instance.login({ preventDefault: jest.fn() });
      expect(spy).toHaveBeenCalled();
    });

    it("should log into an account and redirect to '/'", async () => {
      instance.setState(mockState);
      mock.onPost('/api/account/login').reply(200, {
        savedRecipes: [],
        _id: 1,
        username: 'testUsername',
      });

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

  describe('handleUsername', () => {
    it('should call handleUsername', () => {
      const spy = jest.spyOn(instance, 'handleUsername');
      instance.handleUsername({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update state', () => {
      instance.setState(mockState);
      expect(instance.state.username).toEqual(mockState.username);
      instance.handleUsername({ target: { value: 'test' } });
      expect(instance.state.username).toEqual('test');
    });

    it('should not allow space characters', () => {
      instance.handleUsername({ target: { value: 'test' } });

      expect(instance.state.username).toEqual('test');

      instance.handleUsername({ target: { value: ' ' } });

      expect(instance.state.username).not.toEqual('test');
    });
  });

  describe('handlePassword', () => {
    it('should call handlePassword', () => {
      const spy = jest.spyOn(instance, 'handlePassword');
      instance.handlePassword({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update state', () => {
      instance.setState(mockState);
      expect(instance.state.password).toEqual(mockState.password);
      instance.handlePassword({ target: { value: 'test' } });
      expect(instance.state.password).toEqual('test');
    });

    it('should not allow space characters', () => {
      instance.handlePassword({ target: { value: 'test' } });

      expect(instance.state.password).toEqual('test');

      instance.handlePassword({ target: { value: ' ' } });

      expect(instance.state.password).not.toEqual('test');
    });
  });
});
