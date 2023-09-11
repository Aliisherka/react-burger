import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';
import { passwordReducer } from './password';
import { registReducer } from './registration';

export const rootReducer = combineReducers({
    ingredient: ingredientReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    password: passwordReducer,
    registration: registReducer
})