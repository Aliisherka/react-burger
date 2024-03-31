import type { Middleware, MiddlewareAPI } from 'redux';
import type {
  TWsStoreActions,
  TApplicationActions,
  AppDispatch,
  RootState,
} from '../types';

// eslint-disable-next-line max-len
const socketMiddleware = (wsActions: TWsStoreActions, owner: boolean): Middleware => ((store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | null = null;

  return (next) => (action: TApplicationActions) => {
    const { dispatch } = store;
    const { type } = action;
    const {
      wsInit, wsSendMessage, onOpen, onClose, onError, onMessage,
    } = wsActions;
    const accessToken = localStorage.getItem('accessToken');

    if (type === wsInit) {
      socket = new WebSocket(action.payload);
    }

    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        (accessToken && owner) && dispatch({ type: onMessage, payload: JSON.parse(data), isOwner: owner });
        !owner && dispatch({ type: onMessage, payload: JSON.parse(data), isOwner: owner });
      };

      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };

      if (type === wsSendMessage) {
        const message = action.payload;

        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
}) as Middleware;

export default socketMiddleware;
