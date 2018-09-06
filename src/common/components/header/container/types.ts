import { IRecipe } from '../app/container/types';

export interface IPropTypes {
  history: { replace: (path: String) => void },
  updateRecipes: (updatedRecipes: Array<IRecipe>) => void,
  recipes: Array<IRecipe>,
  isAuth: Boolean,
  updateAuth: (authValue: Boolean) => void,
}

export interface IState {
  showModal: Boolean,
  showAcceptedModal: Boolean,
  acceptedWebsites: Array<String>,
}