import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    modal: modalReducer,
    constructor: constructorReducer
})