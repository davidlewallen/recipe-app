import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
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
    wrapper = shallow(<AppContainer {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should render', (done) => {
    expect(wrapper.find('div').exists()).toBe(true);
    done();
  });

  describe('componentWillMount', () => {
    it('should call componentWillMount', async () => {
      const spy = jest.spyOn(instance, 'componentWillMount');
      await instance.componentWillMount();
      expect(spy).toHaveBeenCalled();
    });

    it('should check auth and update state', async () => {
      await instance.componentWillMount();
      expect(instance.state.isAuth).toBe(true);
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
      expect(instance.state.isAuth).toBe(false);
      instance.updateAuth(true);
      expect(instance.state.isAuth).toBe(true);
    });
  });

  describe('render', () => {
    it('should render HomepageContainer on "/"', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );
      expect(mountWrapper.find('HomepageContainer').exists()).toBe(true);
    });

    it('should render DashboardRoutes on "/dashboard" and isAuth state is true', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );
      mountWrapper.find('AppContainer').instance().setState({ isAuth: true });
      mountWrapper.update();
      expect(mountWrapper.find('DashboardRoutes').exists()).toBe(true);
    });

    it('should redirect to /account/login if isAuth is false and an user tries to nav to /dashboard', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppContainer {...mockProps} />
        </MemoryRouter>,
      );

      expect(mountWrapper.find('LoginContainer').exists()).toBe(true);
    });

    it('should render AccountRoutes on "/account"', () => {
      const mountWrapper = mount(
        <MemoryRouter initialEntries={['/account']}>
          <Route component={AppContainer} />
        </MemoryRouter>,
      );
      expect(mountWrapper.find('AccountRoutes').exists()).toBe(true);
    });
  });
});
