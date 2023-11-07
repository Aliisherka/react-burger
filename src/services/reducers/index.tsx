import { combineReducers } from 'redux';
import { ingredientReducer } from './ingredient';
import { modalReducer } from './modal';
import { constructorReducer } from './constructor';
import { passwordReducer } from './password';
import { registReducer } from './registration';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    registration: registReducer,
    ingredient: ingredientReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    password: passwordReducer,
    ws: wsReducer,
})