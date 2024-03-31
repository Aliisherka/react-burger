/* eslint-disable default-param-last */
import {
  OPEN_ORDER,
  CLOSE_ORDER,
  TModalActions,
  OPER_ERROR_ORDER,
  CLOSE_ERROR_ORDER,
} from 'services/actions/modal';

type TModalState = {
    visibleOrder: boolean,
    errorOrder: boolean
}

export const initialState: TModalState = {
  visibleOrder: false,
  errorOrder: false,
};

export const modalReducer = (state = initialState, action: TModalActions) => {
  switch (action.type) {
    case OPEN_ORDER: {
      return {
        ...state,
        visibleOrder: true,
      };
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        visibleOrder: false,
      };
    }
    case OPER_ERROR_ORDER: {
      return {
        ...state,
        errorOrder: true,
      };
    }
    case CLOSE_ERROR_ORDER: {
      return {
        ...state,
        errorOrder: false,
      };
    }
    default: {
      return state;
    }
  }
};
