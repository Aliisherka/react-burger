import { WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/wsAction"
import { initialState, wsReducer } from "./wsReducer"


describe('wsReducer', () => {
    it('ws connection success', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS
        }

        expect(wsReducer(initialState, action)).toEqual({
            ...initialState,
            wsConnected: true,
            error: undefined
        })
    })

    it('ws connection closed', () => {
        const initialStateClosed = {
            wsConnected: true,
            messages: undefined,
            ownOrder: undefined
        }

        const action = {
            type: WS_CONNECTION_CLOSED
        }

        expect(wsReducer(initialStateClosed, action)).toEqual({
            ...initialStateClosed,
            wsConnected: false,
            error: undefined
        })
    })

    it('ws get message', () => {
        const initialStateMessages = {
            wsConnected: true,
            messages: undefined,
            ownOrder: undefined
        }

        const action = {
            type: WS_GET_MESSAGE,
            payload: {id: '123', order: '123'},
            isOwner: false
        }

        expect(wsReducer(initialStateMessages, action)).toEqual({
            ...initialStateMessages,
            error: undefined,
            messages: {id: '123', order: '123'},
        })
    })
})