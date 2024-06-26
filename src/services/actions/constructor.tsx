import { v4 as uuidv4 } from 'uuid';
import { IConstructorIngredient, IIngredient } from 'services/types/data';

export const DRAGGE_INGREDIENT = 'DRAGGE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DRAGGE_BUN = 'DRAGGE_BUN';

export const CLEAR_COSTRUCTOR = 'CLEAR_COSTRUCTOR';

export const REORDER_CONSTRUCTOR = 'REORDER_CONSTRUCTOR';

export const INCREASE_BUN = 'INCREASE_BUN';

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';

export interface IDRAGGE_INGREDIENT {
    readonly type: typeof DRAGGE_INGREDIENT;
    readonly ingredient: IIngredient[];
    readonly _id: string;
}
export interface IDELETE_INGREDIENT {
    readonly type: typeof DELETE_INGREDIENT;
    readonly uniqueId: string;
}
export interface IDRAGGE_BUN {
    readonly type: typeof DRAGGE_BUN;
    readonly ingredient: IIngredient[];
    readonly _id: string;
}
export interface ICLEAR_COSTRUCTOR {
    readonly type: typeof CLEAR_COSTRUCTOR;
}
export interface IREORDER_CONSTRUCTOR {
    readonly type: typeof REORDER_CONSTRUCTOR;
    readonly index: number;
    readonly order: number;
    readonly item: IIngredient;
}
export interface IINCREASE_BUN {
    readonly type: typeof INCREASE_BUN;
}
export interface IADD_INGRIDIENT {
    readonly type: typeof ADD_INGRIDIENT;
    readonly payload: IIngredient & IConstructorIngredient;
}

export type TConstructorActions =
    | IDRAGGE_INGREDIENT
    | IDELETE_INGREDIENT
    | IDRAGGE_BUN
    | ICLEAR_COSTRUCTOR
    | IREORDER_CONSTRUCTOR
    | IINCREASE_BUN
    | IADD_INGRIDIENT;

export const addIngridient = (item: IIngredient): IADD_INGRIDIENT => {
  const unique = uuidv4();

  return {
    type: ADD_INGRIDIENT,
    payload: {
      ...item,
      uniqueId: unique,
    },
  };
};
