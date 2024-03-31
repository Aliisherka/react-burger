import { initialState, modalReducer } from 'services/reducers/modal';

import {
  OPEN_ORDER,
  CLOSE_ORDER,
  OPER_ERROR_ORDER,
  CLOSE_ERROR_ORDER,
} from 'services/actions/modal';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });

  it('open order', () => {
    const action = {
      type: OPEN_ORDER,
    };

    expect(modalReducer(initialState, action)).toEqual({
      ...initialState,
      visibleOrder: true,
    });
  });

  it('close order', () => {
    const initialStateCloseModal = {
      ...initialState,
      visibleOrder: true,
    };

    const action = {
      type: CLOSE_ORDER,
    };

    expect(modalReducer(initialStateCloseModal, action)).toEqual({
      ...initialStateCloseModal,
      visibleOrder: false,
    });
  });

  it('open error order', () => {
    const action = {
      type: OPER_ERROR_ORDER,
    };

    expect(modalReducer(initialState, action)).toEqual({
      ...initialState,
      errorOrder: true,
    });
  });

  it('close error order', () => {
    const initialStateCloseError = {
      ...initialState,
      errorOrder: true,
    };

    const action = {
      type: CLOSE_ERROR_ORDER,
    };

    expect(modalReducer(initialStateCloseError, action)).toEqual({
      ...initialStateCloseError,
      errorOrder: false,
    });
  });
});
