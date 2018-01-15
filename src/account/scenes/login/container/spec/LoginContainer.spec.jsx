import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import LoginContainer from '../LoginContainer';

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

  const props = { ...mockHistory };

  let wrapper = null;
  let instance = null;

  const clog = console.log;

  beforeEach(() => {
    window.console.log = clog;
    jest.resetAllMocks();

    mock.reset();

    wrapper = shallow(<LoginContainer {...props} />);
    instance = wrapper.instance();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('login', () => {
    it('should call login', () => {
      const spy = jest.spyOn(instance, 'login');
      instance.login({ preventDefault: jest.fn() });
      expect(spy).toHaveBeenCalled();
    });

    it('should log into an account and redirect to \'/\'', async () => {
      instance.setState(mockState);
      mock.onPost('/api/account/login').reply(200, {
        savedRecipes: [],
        _id: 1,
        username: 'testUsername',
      });

      await instance.login({ preventDefault: jest.fn() });
      expect(instance.props.history.replace).toHaveBeenCalledWith('/');
    });

    it('should update error state with 400s', async () => {
      mock.onPost('/api/account/login').reply(400, { message: 'error' });
      instance.setState({
        ...mockState,
        username: '',
      });
      await instance.login({ preventDefault: jest.fn() });
      expect(instance.state.error).toEqual({ value: true, message: 'error' });
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
  });

  describe('handleEmail', () => {
    it('should call clearFields', () => {
      const spy = jest.spyOn(instance, 'clearFields');
      instance.clearFields();
      expect(spy).toHaveBeenCalled();
    });

    it('should clear field state', () => {
      instance.setState(mockState);
      instance.clearFields();
      expect(instance.state.username).toEqual('');
      expect(instance.state.password).toEqual('');
    });
  });
});
