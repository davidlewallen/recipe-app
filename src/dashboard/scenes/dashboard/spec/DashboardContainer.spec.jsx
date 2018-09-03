import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import DashboardContainer from '../container/DashboardContainer';

const mock = new MockAdapter(axios);

describe('DashboardContainer test', () => {
  const mockHistory = { history: { replace: jest.fn() } };
  const mockRecipeList = [
    {
      title: 'recipe 1',
      _id: 1,
      url: {
        href: 'recipe1',
      },
    },
    {
      title: 'recipe 2',
      _id: 2,
      url: {
        href: 'recipe2',
      },
    },
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

  describe('componentDidMount', () => {
    it('should call getUserRecipes', () => {
      const spy = jest.spyOn(instance, 'getUserRecipes');
      instance.componentDidMount();
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

    it('should log an error if getUserRecipes api fails', async () => {
      mock.reset();
      mock.onGet().reply(500);
      const clog = console.log;
      window.console.log = jest.fn();
      await instance.getUserRecipes();
      expect(window.console.log).toHaveBeenCalled();
      window.console.log = clog;
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

    it('should log error if request is bad', async () => {
      mock.reset();
      mock.onDelete().reply(500);
      const clog = console.log;
      window.console.log = jest.fn();
      await instance.deleteRecipe(1);
      expect(window.console.log).toHaveBeenCalled();
      window.console.log = clog;
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

  describe('handleSearch', () => {
    it('should update searchValue state', () => {
      instance.handleSearch({ target: { value: 'test' } });
      expect(instance.state.searchValue).toBe('test');
    });
  });
});
