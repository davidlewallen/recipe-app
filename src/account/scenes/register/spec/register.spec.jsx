import React from 'react';
import { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

import RegisterContainer from '../container/RegisterContainer';

const mock = new MockAdapter(axios);

describe('Login Full Rendering Test', () => {
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

    wrapper = mount(
      <MemoryRouter>
        <RegisterContainer {...props} />
      </MemoryRouter>
    );
    // const router = wrapper.find('Router');
    const container = wrapper.find('RegisterContainer');
    instance = container.instance();
  });

  afterAll(() => {
    mock.restore();
  });
  test('that a user can update the username, password, and email input', () => {
    const spy = jest.spyOn(instance, 'handleUsername');
    const spy2 = jest.spyOn(instance, 'handlePassword');
    const spy3 = jest.spyOn(instance, 'handleEmail');
    let usernameInput = wrapper.find('input.username-input');
    let passwordInput = wrapper.find('input.password-input');
    let emailInput = wrapper.find('input.email-input');
    expect(usernameInput.length).toBe(1);
    expect(usernameInput.text()).toBe('');
    expect(passwordInput.length).toBe(1);
    expect(passwordInput.text()).toBe('');
    expect(emailInput.length).toBe(1);
    expect(emailInput.text()).toBe('');

    instance.setState({
      username: '',
      password: '',
      email: '',
      error: { value: false, message: '' },
    });
    expect(instance.state.username).toEqual('');
    expect(instance.state.password).toEqual('');
    expect(instance.state.email).toEqual('');

    usernameInput
      .at(0)
      .simulate('change', { target: { value: 'testUsername' } });
    passwordInput
      .at(0)
      .simulate('change', { target: { value: 'testPassword' } });
    emailInput
      .at(0)
      .simulate('change', { target: { value: 'test@email.com' } });
    usernameInput = wrapper.find('input.username-input');
    passwordInput = wrapper.find('input.password-input');
    emailInput = wrapper.find('input.email-input');

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
    expect(instance.state.username).toEqual('testUsername');
    expect(usernameInput.props().value).toEqual('testUsername');
    expect(instance.state.password).toEqual('testPassword');
    expect(passwordInput.props().value).toEqual('testPassword');
    expect(instance.state.email).toEqual('test@email.com');
    expect(emailInput.props().value).toEqual('test@email.com');
  });

  test('that a user can click the register button', done => {
    mock.onPost('/api/account/register').reply(200);
    const spy = jest.spyOn(instance, 'register');

    instance.setState(mockState);

    wrapper
      .find('button.register-button')
      .simulate('click', { preventDefault: jest.fn() });
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      expect(instance.props.history.replace).toHaveBeenCalledWith(
        '/account/verify'
      );
      done();
    });
  });
});
