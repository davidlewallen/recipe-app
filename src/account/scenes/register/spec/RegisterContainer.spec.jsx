import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import RegisterContainer from '../container/RegisterContainer';

const mock = new MockAdapter(axios);

describe('RegisterContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockState = {
    username: 'testUsername',
    password: 'testPassword',
    email: 'test@email.com',
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

    wrapper = shallow(<RegisterContainer {...props} />);
    instance = wrapper.instance();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('register', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should call register', () => {
      const spy = jest.spyOn(instance, 'register');
      instance.register({ preventDefault: jest.fn() });
      window.console.log = jest.fn();
      expect(spy).toHaveBeenCalled();
    });

    it('should register an account and redirect to \'/\'', async () => {
      instance.setState(mockState);
      mock.onPost('/api/account/register').reply(200, { savedRecipes: [], _id: 1, username: 'testUsername' });
      await instance.register({ preventDefault: jest.fn() });
      expect(instance.props.history.replace).toHaveBeenCalledWith('/dashboard');
    });

    it('should update error state on 409s', async () => {
      const mockErrorMessage = '409 error';
      mock
        .onPost('/api/account/register')
        .reply(409, { message: mockErrorMessage });
      instance.setState(mockState);
      await instance.register({ preventDefault: jest.fn() });
      expect(instance.state.error).toEqual({ value: true, message: mockErrorMessage });
    });

    it('should update error state on 400s', async () => {
      const mockErrorMessage = '400 error';
      mock
        .onPost('/api/account/register')
        .reply(400, { message: mockErrorMessage });
      instance.setState(mockState);
      await instance.register({ preventDefault: jest.fn() });
      expect(instance.state.error).toEqual({ value: true, message: mockErrorMessage });
    });
  });

  describe('handleUsername', () => {
    it('should call handleUsername', () => {
      const spy = jest.spyOn(instance, 'handleUsername');
      instance.handleUsername({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update state', () => {
      expect(instance.state.username).toEqual('');
      instance.handleUsername({ target: { value: 'testUsername' } });
      expect(instance.state.username).toEqual('testUsername');
    });
  });

  describe('handlePassword', () => {
    it('should call handlePassword', () => {
      const spy = jest.spyOn(instance, 'handlePassword');
      instance.handlePassword({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update state', () => {
      expect(instance.state.password).toEqual('');
      instance.handlePassword({ target: { value: 'testPassword' } });
      expect(instance.state.password).toEqual('testPassword');
    });
  });

  describe('handleEmail', () => {
    it('should call handleEmail', () => {
      const spy = jest.spyOn(instance, 'handleEmail');
      instance.handleEmail({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update state', () => {
      expect(instance.state.email).toEqual('');
      instance.handleEmail({ target: { value: 'test@email.com' } });
      expect(instance.state.email).toEqual('test@email.com');
    });
  });
});
