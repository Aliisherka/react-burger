import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import store from 'index';
import { TConstructorActions } from 'services/actions/constructor';
import { TIngredientActions } from 'services/actions/ingredient';
import { TModalActions } from 'services/actions/modal';
import { TPasswordActions } from 'services/actions/password';
import { TRegistrationActions } from 'services/actions/registration';
import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from 'services/actions/wsAction';

export type TApplicationActions =
    | TConstructorActions
    | TIngredientActions
    | TModalActions
    | TPasswordActions
    | TWSActions
    | TRegistrationActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type TWsStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
};
