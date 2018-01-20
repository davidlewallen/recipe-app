import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import DashboardContainer from '../DashboardContainer';

const mock = new MockAdapter(axios);

describe('DashboardContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockRecipeList = [
    { title: 'recipe 1', _id: 1 }, { title: 'recipe 2', _id: 2 },
  ];
  const mockGetAuth = { isAuth: true };

  const props = { ...mockHistory };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    jest.resetAllMocks();

    mock.reset();
    mock
      .onGet('/api/account/auth')
      .reply(200, mockGetAuth)
      .onGet('/api/recipe')
      .reply(200, mockRecipeList)
      .onDelete('/api/recipe/delete/1')
      .reply(200, [mockRecipeList[1]]);

    wrapper = shallow(<DashboardContainer {...props} />);
    instance = wrapper.instance();
  });

  afterAll(() => {
    mock.restore();
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

    it('should update state with the user\'s recipes', async () => {
      await instance.getUserRecipes();
      expect(instance.state.recipe.list).toEqual(mockRecipeList);
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

  describe('submitRecipe', () => {
    it('should call submitRecipe', () => {
      const spy = jest.spyOn(instance, 'submitRecipe');
      instance.submitRecipe({ preventDefault: jest.fn() });
      window.console.error = jest.fn();
      expect(spy).toHaveBeenCalled();
    });

    it('should submit a recipe and update state', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(200, mockRecipeList[0]);
      instance.setState({ recipe: { url: 'randomurl', list: [] } });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(instance.state.recipe.list).toEqual([mockRecipeList[0]]);
    });

    it('should submit a recipe but not update state if alreadyAdded: true', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(200, { alreadyAdded: true });
      instance.setState({ recipe: { url: 'randomurl', list: [mockRecipeList[0]] } });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(instance.state.recipe.list).toEqual([mockRecipeList[0]]);
    });

    it('should not add a blank recipe card if nonProcessable: true', async () => {
      mock.reset();
      mock.onPost('/api/recie/submit/randomurl').reply(200, { nonProcessable: true });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(instance.state.recipe.list).toEqual([]);
    });

    it('should alert the user if website is not processable', async () => {
      mock.reset();
      mock.onPost('/api/recipe/submit/randomurl').reply(403, { nonProcessable: true });
      instance.setState({ recipe: { url: 'randomurl', list: [] } });
      window.alert = jest.fn();
      window.console.error = jest.fn();

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('deleteRecipe', () => {
    it('should call deleteRecipe', async () => {
      const spy = jest.spyOn(instance, 'deleteRecipe');
      await instance.deleteRecipe(1);
      expect(spy).toHaveBeenCalled();
    });

    it('should delete a recipe and update state', async () => {
      instance.setState({ recipe: { url: '', list: mockRecipeList } });
      await instance.deleteRecipe(1);
      expect(instance.state.recipe.list).toEqual([mockRecipeList[1]]);
    });
  });

  describe('handleRecipe', () => {
    it('should call handleRecipe', () => {
      const spy = jest.spyOn(instance, 'handleRecipe');
      instance.handleRecipe({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update url state', () => {
      expect(instance.state.recipe.url).toEqual('');
      instance.handleRecipe({ target: { value: 'test' } });
      expect(instance.state.recipe.url).toEqual('test');
    });
  });

  describe('handleModalClose', () => {
    it('should call handleModalClose and update state', () => {
      const spy = jest.spyOn(instance, 'handleModalClose');

      expect(instance.state.showModal).toBe(false);

      instance.setState({ showModal: true });
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
