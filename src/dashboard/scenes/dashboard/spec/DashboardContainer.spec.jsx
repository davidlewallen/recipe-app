import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import DashboardContainer from '../container/DashboardContainer';

const mock = new MockAdapter(axios);

describe('DashboardContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockRecipeList = [
    { title: 'recipe 1', _id: 1 }, { title: 'recipe 2', _id: 2 },
  ];
  const mockGetAuth = { isAuth: true };

  const props = {
    ...mockHistory,
    updateRecipes: jest.fn(),
    recipes: [],
  };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    jest.clearAllMocks();

    mock.reset();
    mock
      .onGet('/api/account/auth')
      .reply(200, mockGetAuth)
      .onGet('/api/recipe')
      .reply(200, mockRecipeList)
      .onDelete('/api/recipe/delete/1')
      .reply(200, [mockRecipeList[1]]);

    wrapper = shallow(<DashboardContainer {...props} />);
    wrapper.setState({ selectedRecipe: { url: { href: '' } } });
    instance = wrapper.instance();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  describe('componentWillMount', () => {
    it('should call initialize', () => {
      const spy = jest.spyOn(instance, 'initialize');
      instance.componentWillMount();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getUserRecipes', () => {
    it('should have called getUserRecipes', () => {
      const spy = jest.spyOn(instance, 'getUserRecipes');
      instance.getUserRecipes();
      expect(spy).toHaveBeenCalled();
    });

    it('should call updateRecipes with the user\'s recipes', async () => {
      await instance.getUserRecipes();
      expect(instance.props.updateRecipes).toHaveBeenCalledWith(mockRecipeList);
    });
  });

  describe('checkIsAuth', () => {
    it('should call checkIsAuth', () => {
      const spy = jest.spyOn(instance, 'checkIsAuth');
      instance.checkIsAuth();
      expect(spy).toHaveBeenCalled();
    });

    it('should call history.replace with \'/\' args if isAuth: false', async () => {
      mock.reset();
      mock.onGet('/api/account/auth').reply(200, { isAuth: false });

      const spy = jest.spyOn(instance.props.history, 'replace');
      await instance.checkIsAuth();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('/account/login');
    });

    it('should not call history.replace if isAuth: true', async () => {
      const spy = jest.spyOn(instance.props.history, 'replace');
      await instance.checkIsAuth();
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('initialize', () => {
    it('should call checkIsAuth and getUsersRecipes', async () => {
      const spy = jest.spyOn(instance, 'checkIsAuth');
      const spy2 = jest.spyOn(instance, 'getUserRecipes');
      await instance.initialize();
      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
    });
  });

  describe('deleteRecipe', () => {
    it('should call deleteRecipe', async () => {
      const spy = jest.spyOn(instance, 'deleteRecipe');
      await instance.deleteRecipe(1);
      expect(spy).toHaveBeenCalled();
    });

    it('should call updateRecipes', async () => {
      await instance.deleteRecipe(1);
      expect(props.updateRecipes).toHaveBeenCalled();
    });

    it('should delete a recipe and update state', async () => {
      await instance.deleteRecipe(1);
      expect(props.updateRecipes).toHaveBeenCalledWith([mockRecipeList[1]]);
    });
  });

  describe('handleModalClose', () => {
    it('should call handleModalClose and update state', () => {
      const spy = jest.spyOn(instance, 'handleModalClose');

      expect(instance.state.showModal).toBe(false);

      instance.setState({
        showModal: true,
        selectedRecipe: { url: { href: '' } },
      });
      instance.handleModalClose();
      expect(spy).toHaveBeenCalled();
      expect(instance.state.showModal).toBe(false);
    });
  });

  describe('viewRecipe', () => {
    it('should call viewRecipe', () => {
      const spy = jest.spyOn(instance, 'viewRecipe');
      instance.viewRecipe({ ...mockRecipeList[0] });

      expect(spy).toHaveBeenCalled();
    });

    it('should update selectedRecipe and showModal', () => {
      instance.viewRecipe({ ...mockRecipeList[0] });
      expect(instance.state.showModal).toBe(true);
      expect(instance.state.selectedRecipe).toEqual(mockRecipeList[0]);
    });
  });
});
