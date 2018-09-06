import { IRecipe } from '../../../../common/components/app/container/types';

export interface IPropTypes {
  showModal: Boolean,
  handleModalClose: () => void,
  selectedRecipe: IRecipe,
  deleteRecipe: () => void,
};
