import { WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from 'services/actions/wsAction';
import { initialState, wsReducer } from 'services/reducers/wsReducer';

describe('wsReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('ws connection success', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    };

    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined,
    });
  });

  it('ws connection closed', () => {
    const initialStateClosed = {
      ...initialState,
      wsConnected: true,
    };

    const action = {
      type: WS_CONNECTION_CLOSED,
    };

    expect(wsReducer(initialStateClosed, action)).toEqual({
      ...initialStateClosed,
      wsConnected: false,
      error: undefined,
    });
  });

  it('ws get message', () => {
    const initialStateMessages = {
      ...initialState,
      wsConnected: true,
    };

    const action = {
      type: WS_GET_MESSAGE,
      payload: { id: '123', order: '123' },
      isOwner: false,
    };

    expect(wsReducer(initialStateMessages, action)).toEqual({
      ...initialStateMessages,
      error: undefined,
      messages: { id: '123', order: '123' },
    });
  });
});
