import { IRecipe } from '../../app/container/types';

export interface IPropTypes {
  show: Boolean,
  handleModalClose: () => void,
  updateRecipes: (updatedRecipes: Array<IRecipe>) => void,
  recipes: Array<IRecipe>,
}

export interface IState { url: String }
