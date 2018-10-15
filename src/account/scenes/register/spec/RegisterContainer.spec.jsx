import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import RegisterContainer from '../container/RegisterContainer';

import { Account } from '../../../../common/utils/api';

const mock = new MockAdapter(axios);

describe('RegisterContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockState = {
    password: 'testPassword',
    passwordConf: 'testPassword',
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

    it('should call validatePassword', async () => {
      mock.onPost(Account.endpoints.register).reply(200);

      const spy = jest.spyOn(instance, 'validatePassword');

      await instance.register({ preventDefault: jest.fn() });

      expect(spy).toHaveBeenCalled();
    });

    it('should call register', () => {
      const spy = jest.spyOn(instance, 'register');

      instance.register({ preventDefault: jest.fn() });

      window.console.log = jest.fn();

      expect(spy).toHaveBeenCalled();
    });

    it("should register an account and redirect to '/'", async () => {
      mock
        .onPost('/api/account/register')
        .reply(200, { savedRecipes: [], _id: 1, username: 'testUsername' });

      instance.setState(mockState);
      await instance.register({ preventDefault: jest.fn() });

      expect(instance.props.history.replace).toHaveBeenCalledWith(
        '/account/verify'
      );
    });

    it('should set error state to err.message', async () => {
      wrapper.setState({
        password: 'not',
        passwordConf: 'equal',
      });

      await instance.register({ preventDefault: jest.fn() });

      expect(wrapper.state('error')).toEqual({
        value: true,
        message: 'Passwords must match.',
      });
    });

    it('should update error state on 409s', async () => {
      const mockErrorMessage = '409 error';

      mock
        .onPost('/api/account/register')
        .reply(409, { message: mockErrorMessage });

      instance.setState(mockState);
      await instance.register({ preventDefault: jest.fn() });

      expect(instance.state.error).toEqual({
        value: true,
        message: mockErrorMessage,
      });
    });

    it('should update error state on 400s', async () => {
      const mockErrorMessage = '400 error';
      mock
        .onPost('/api/account/register')
        .reply(400, { message: mockErrorMessage });

      instance.setState(mockState);
      await instance.register({ preventDefault: jest.fn() });

      expect(instance.state.error).toEqual({
        value: true,
        message: mockErrorMessage,
      });
    });
  });

  describe('validatePassword', () => {
    it('should throw error if passwords are not equal', () => {
      wrapper.setState({
        password: 'not',
        passwordConf: 'equal',
      });

      expect(instance.validatePassword).toThrow();
    });

    it('should not throw if passwords are equal', () => {
      expect(instance.validatePassword).not.toThrow();
    });
  });

  describe('handleInputChange', () => {
    it('should update email state', () => {
      const expectedState = 'testemail';

      instance.handleInputChange({
        target: { name: 'email', value: expectedState },
      });

      expect(wrapper.state('email')).toEqual(expectedState);
    });

    it('should update password state', () => {
      const expectedState = 'testpassword';

      instance.handleInputChange({
        target: { name: 'password', value: expectedState },
      });

      expect(wrapper.state('password')).toEqual(expectedState);
    });

    it('should update passwordConf state', () => {
      const expectedState = 'testpasswordconf';

      instance.handleInputChange({
        target: { name: 'passwordConf', value: expectedState },
      });

      expect(wrapper.state('passwordConf')).toEqual(expectedState);
    });
  });
});
