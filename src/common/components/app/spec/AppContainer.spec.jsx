import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import AppContainer from '../container/AppContainer';

const mock = new MockAdapter(axios);

describe('AppContainer', () => {
  let wrapper = null;
  let instance = null;

  const mockProps = {
    history: { push: jest.fn(), replace: jest.fn() },
    location: { pathname: '/' },
  };

  beforeEach(() => {
    mock.reset();
    mock.onGet('/api/account/auth').reply(200, { isAuth: true });
    mock.onGet('/api/recipe').reply(200, [{ title: '1', _id: 1 }]);
    mock.onGet('/api/account/user').reply(200, {
      _id: '123',
      username: 'test',
      email: 'testEmail',
    });
    wrapper = shallow(<AppContainer {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    wrapper.setState({ loading: false });

    expect(wrapper.find('Fragment').exists()).toBe(true);
  });

  describe('componentDidMount', () => {
    it('should call componentDidMount', async () => {
      const spy = jest.spyOn(instance, 'componentDidMount');
      await instance.componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('should check auth and update state', async () => {
      await instance.componentDidMount();
      expect(instance.state.isAuth).toBe(true);
    });

    it('should call getUser if data.isAuth is truthy', async () => {
      const spy = jest.spyOn(instance, 'getUser');
      await instance.componentDidMount();
      expect(spy).toHaveBeenCalled();
    });

    it('should set loading state to false if data.isAuth is falsey', async () => {
      instance.setState({ loading: true });
      mock.onGet('/api/account/auth').reply(200, { isAuth: false });
      expect(instance.state.loading).toBe(true);
      await instance.componentDidMount();
      expect(instance.state.loading).toBe(false);
    });
  });

  // describe('axios.intercepters', () => {
    // it('should return error if api calls are not 401', async () => {
    //   mock.onGet('/api/account/auth').reply(500, { error: 'test' });
    //   instance.mockCall = () => axios.get('/api/account/auth');
    //   await instance.mockCall();
    //   expect(instance.props.history.push).toHaveBeenCalledTimes(0);
    // });

    // it('should redirect to /account/login if api calls error 401 and location is not "/"', async () => {
    //   mock.onGet('/mockCall').reply(401);
    //   wrapper.setProps({ location: { pathname: '/dashboard' } });
    //   instance.mockCall = () => axios.get('/mockCall');

    //   await instance.mockCall();
    //   expect(instance.props.history.push).toHaveBeenCalled();
    // });
  // });

  describe('getUser', () => {
    it('should update user state', async () => {
      await instance.getUser();
      expect(instance.state.user).toEqual({
        _id: '123',
        username: 'test',
        email: 'testEmail',
      });
    });
  });

  describe('updateRecipes', () => {
    it('should update recipes state using an object', () => {
      const mockRecipe = { test: true };
      expect(instance.state.recipes.length).toBe(0);
      instance.updateRecipes(mockRecipe);
      expect(instance.state.recipes.length).toBe(1);
      expect(instance.state.recipes[0]).toEqual(mockRecipe);
    });

    it('should update recipes state using an array', () => {
      const mockRecipe = [{ test: true }];
      expect(instance.state.recipes.length).toBe(0);
      instance.updateRecipes(mockRecipe);
      expect(instance.state.recipes.length).toBe(1);
      expect(instance.state.recipes).toEqual(mockRecipe);
    });
  });

  describe('updateAuth', () => {
    it('should update isAuth state', () => {
      expect(instance.state.isAuth).toBe(true);
      instance.updateAuth(false);
      expect(instance.state.isAuth).toBe(false);
    });

    it('should call getUser if authValue is truthy', () => {
      const spy = jest.spyOn(instance, 'getUser');
      instance.setState({ isAuth: false });
      instance.updateAuth(true);
      expect(spy).toHaveBeenCalled();
    });

    it('should not call getUser if authValue is falsey', () => {
      const spy = jest.spyOn(instance, 'getUser');
      instance.updateAuth(false);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('render', () => {
    it('should render HomepageContainer on "/"', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );
      mountWrapper.find('AppContainer').instance().setState({ loading: false });
      mountWrapper.update();
      expect(mountWrapper.find('HomepageContainer').exists()).toBe(true);
    });

    it('should render DashboardRoutes on "/dashboard" and isAuth state is true and username is truthy', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );

      mountWrapper.find('AppContainer').instance().setState({
        user: { username: 'test' },
        loading: false,
      });
      mountWrapper.update();
      expect(mountWrapper.find('DashboardRoutes').exists()).toBe(true);
    });

    it('should redirect to /account/login if isAuth is false and an user tries to nav to /dashboard', () => {
      mock.onGet('/api/account/auth').reply(200, { isAuth: false });
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );

      mountWrapper.find('AppContainer').instance().setState({
        isAuth: false,
        user: { username: '' },
        loading: false,
      });
      mountWrapper.update();
      mountWrapper.find('Router').prop('history').push('/dashboard');
      mountWrapper.update();

      expect(mountWrapper.find('LoginContainer').exists()).toBe(true);
    });

    it('should render AccountRoutes on "/account"', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/account']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );

      mountWrapper.find('AppContainer').instance().setState({ loading: false });
      mountWrapper.update();

      expect(mountWrapper.find('AccountRoutes').exists()).toBe(true);
    });
  });
});
