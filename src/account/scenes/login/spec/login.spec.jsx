import React from 'react';
import { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import LoginContainer from '../container/LoginContainer';

const mock = new MockAdapter(axios);

describe('Login Full Rendering Test', () => {
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

    wrapper = mount(<MemoryRouter><LoginContainer {...props} /></MemoryRouter>);
    // const router = wrapper.find('Router');
    const container = wrapper.find('LoginContainer');
    instance = container.instance();
  });

  afterAll(() => {
    mock.restore();
  });
  test('that a user can update the username and password input', () => {
    const spy = jest.spyOn(instance, 'handleUsername');
    const spy2 = jest.spyOn(instance, 'handlePassword');
    let usernameInput = wrapper.find('input.username-input');
    let passwordInput = wrapper.find('input.password-input');
    expect(usernameInput.length).toBe(1);
    expect(usernameInput.text()).toBe('');
    expect(passwordInput.length).toBe(1);
    expect(passwordInput.text()).toBe('');


    instance.setState({ username: '', password: '', error: { value: false, message: '' } });
    expect(instance.state.username).toEqual('');
    expect(instance.state.password).toEqual('');

    usernameInput.at(0).simulate('change', { target: { value: 'testUsername' } });
    passwordInput.at(0).simulate('change', { target: { value: 'testPassword' } });
    usernameInput = wrapper.find('input.username-input');
    passwordInput = wrapper.find('input.password-input');

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(instance.state.username).toEqual('testUsername');
    expect(usernameInput.props().value).toEqual('testUsername');
    expect(instance.state.password).toEqual('testPassword');
    expect(passwordInput.props().value).toEqual('testPassword');
  });

  test('that a user can click the login button', (done) => {
    mock.onPost('/api/account/login').reply(200);
    const spy = jest.spyOn(instance, 'login');

    instance.setState(mockState);

    wrapper.find('button.login-button').simulate('click', { preventDefault: jest.fn() });
    setImmediate(() => {
      expect(spy).toHaveBeenCalled();
      expect(instance.props.history.replace).toHaveBeenCalledWith('/dashboard');
      done();
    });
  });
});
