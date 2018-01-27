import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import SubmitRecipeContainer from '../container/SubmitRecipeContainer';

const mock = new MockAdapter(axios);

describe('SubmitRecipeContainer test', () => {
  const mockRecipeList = [
    { title: 'recipe 1', _id: 1 }, { title: 'recipe 2', _id: 2 },
  ];

  const mockProps = {
    show: false,
    handleModalClose: jest.fn(),
    updateRecipes: jest.fn(),
    recipes: [],
  };

  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    mock.reset();
    jest.clearAllMocks();

    wrapper = shallow(<SubmitRecipeContainer {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  describe('handleURL', () => {
    it('should call handleURL', () => {
      const spy = jest.spyOn(instance, 'handleURL');
      instance.handleURL({ target: { value: '' } });
      expect(spy).toHaveBeenCalled();
    });

    it('should update url state', () => {
      expect(instance.state.url).toEqual('');
      instance.handleURL({ target: { value: 'test' } });
      expect(instance.state.url).toEqual('test');
    });
  });


  describe('submitRecipe', () => {
    it('should call submitRecipe', () => {
      mock.onPost('/api/recipe/submit/%27%27').reply(200);
      const spy = jest.spyOn(instance, 'submitRecipe');
      instance.submitRecipe({ preventDefault: jest.fn() });
      window.console.error = jest.fn();
      expect(spy).toHaveBeenCalled();
    });

    it('should call handleModalClose', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(200, mockRecipeList[0]);
      instance.setState({ url: 'randomurl' });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      setTimeout(() => {
        expect(mockProps.handleModalClose).toHaveBeenCalled();
      });
    });

    it('should clear url state and call updateRecipes with returned value as the first index', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(200, mockRecipeList[0]);
      wrapper.setProps({ recipes: [mockRecipeList[1]] });
      instance.setState({ url: 'randomurl' });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(instance.state.url).toBe('');
      setTimeout(() => {
        expect(mockProps.updateRecipes)
          .toHaveBeenCalledWith([mockRecipeList[0], mockRecipeList[1]]);
      });
    });

    it('should not call updateRecipes if alreadyAdded: true', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(200, { alreadyAdded: true });
      instance.setState({ url: 'randomurl' });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(mockProps.updateRecipes).toHaveBeenCalledTimes(0);
    });

    it('should not call updateRecipes if nonProcessable: true', async () => {
      mock.onPost('/api/recie/submit/%27%27').reply(200, { nonProcessable: true });

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(mockProps.updateRecipes).toHaveBeenCalledTimes(0);
    });

    it('should alert the user if website is not processable', async () => {
      mock.onPost('/api/recipe/submit/randomurl').reply(403, { nonProcessable: true });
      instance.setState({ url: 'randomurl' });
      window.alert = jest.fn();
      window.console.error = jest.fn();

      await instance.submitRecipe({ preventDefault: jest.fn() });
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
