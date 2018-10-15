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
  test('that a user can update the password, passwordConf, and email input', () => {
    const spy = jest.spyOn(instance, 'handleInputChange');
    let passwordInput = wrapper.find('input.password-input');
    let passwordConfInput = wrapper.find('input.passwordConf-input');
    let emailInput = wrapper.find('input.email-input');
    expect(passwordInput.length).toBe(1);
    expect(passwordInput.text()).toBe('');
    expect(passwordConfInput.length).toBe(1);
    expect(passwordConfInput.text()).toBe('');
    expect(emailInput.length).toBe(1);
    expect(emailInput.text()).toBe('');

    instance.setState({
      password: '',
      passwordConf: '',
      email: '',
      error: { value: false, message: '' },
    });

    passwordInput.at(0).simulate('change', {
      target: { name: 'password', value: 'testPassword' },
    });
    passwordInput.at(0).simulate('change', {
      target: { name: 'passwordConf', value: 'testPassword' },
    });
    emailInput.at(0).simulate('change', {
      target: { name: 'email', value: 'test@email.com' },
    });

    passwordInput = wrapper.find('input.password-input');
    passwordConfInput = wrapper.find('input.passwordConf-input');
    emailInput = wrapper.find('input.email-input');

    expect(spy).toHaveBeenCalledTimes(3);
    expect(instance.state.password).toEqual('testPassword');
    expect(passwordInput.props().value).toEqual('testPassword');
    expect(instance.state.passwordConf).toEqual('testPassword');
    expect(passwordConfInput.props().value).toEqual('testPassword');
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
