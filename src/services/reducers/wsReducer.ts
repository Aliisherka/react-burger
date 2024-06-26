/* eslint-disable default-param-last */
import {
  TWSActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from 'services/actions/wsAction';
import { IMessage } from 'services/types/data';

type TWSState = {
    wsConnected: boolean;
    messages?: IMessage;
    ownOrder?: IMessage;

    error?: Event;
}

export const initialState: TWSState = {
  wsConnected: false,
  messages: undefined,
  ownOrder: undefined,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: !action.isOwner ? action.payload : state.messages,
        ownOrder: action.isOwner ? action.payload : state.ownOrder,
      };
    default:
      return state;
  }
};
