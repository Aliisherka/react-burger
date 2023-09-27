import { v4 as uuidv4 } from 'uuid';

export const DRAGGE_INGREDIENT = 'DRAGGE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DRAGGE_BUN = 'DRAGGE_BUN';

export const GIVE_UNIQUE_ID = 'GIVE_UNIQUE_ID';

export const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE';

export const CLEAR_COSTRUCTOR = 'CLEAR_COSTRUCTOR';

export const REORDER_CONSTRUCTOR = 'REORDER_CONSTRUCTOR';

export const INCREASE_BUN = 'INCREASE_BUN';

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';

export const addIngridient = (item) => {
    return {
        type: ADD_INGRIDIENT,
        payload: {
            ...item,
           uniqueId: uuidv4()
        }
    }
}