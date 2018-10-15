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

  const props = { ...mockHistory, updateAuth: jest.fn() };

  let wrapper = null;
  let instance = null;

  const clog = console.log;

  beforeEach(() => {
    window.console.log = clog;
    jest.resetAllMocks();

    mock.reset();

    wrapper = mount(
      <MemoryRouter>
        <LoginContainer {...props} />
      </MemoryRouter>
    );
    // const router = wrapper.find('Router');
    const container = wrapper.find('LoginContainer');
    instance = container.instance();
  });

  afterAll(() => {
    mock.restore();
  });
  test('that a user can update the email and password input', () => {
    const spy = jest.spyOn(instance, 'handleInputChange');
    let emailInput = wrapper.find('input.email-input');
    let passwordInput = wrapper.find('input.password-input');

    instance.setState({
      email: '',
      password: '',
      error: { value: false, message: '' },
    });

    emailInput.at(0).simulate('change', {
      target: { name: 'email', value: 'test@email.com' },
    });
    passwordInput.at(0).simulate('change', {
      target: { name: 'password', value: 'testPassword' },
    });
    emailInput = wrapper.find('input.email-input');
    passwordInput = wrapper.find('input.password-input');

    expect(spy).toHaveBeenCalledTimes(2);
    expect(instance.state.email).toEqual('test@email.com');
    expect(emailInput.props().value).toEqual('test@email.com');
    expect(instance.state.password).toEqual('testPassword');
    expect(passwordInput.props().value).toEqual('testPassword');
  });

  test('that a user can click the login button', done => {
    mock.onPost('/api/account/login').reply(200);
    const spy = jest.spyOn(instance, 'login');

    instance.setState(mockState);

    wrapper
      .find('button.login-button')
      .simulate('click', { preventDefault: jest.fn() });
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      expect(instance.props.history.replace).toHaveBeenCalledWith('/dashboard');
      done();
    });
  });
});
