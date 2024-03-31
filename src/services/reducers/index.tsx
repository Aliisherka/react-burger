import { combineReducers } from 'redux';
import { ingredientReducer } from 'services/reducers/ingredient';
import { modalReducer } from 'services/reducers/modal';
import { constructorReducer } from 'services/reducers/constructor';
import { passwordReducer } from 'services/reducers/password';
import { registReducer } from 'services/reducers/registration';
import { wsReducer } from 'services/reducers/wsReducer';

const rootReducer = combineReducers({
  registration: registReducer,
  ingredient: ingredientReducer,
  modal: modalReducer,
  constructor: constructorReducer,
  password: passwordReducer,
  ws: wsReducer,
});

export default rootReducer;
