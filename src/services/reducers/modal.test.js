import { initialState, modalReducer } from './modal';

import { OPEN_ORDER, CLOSE_ORDER, OPER_ERROR_ORDER, CLOSE_ERROR_ORDER } from '../actions/modal';

describe('modal reducer', () => {
    it('open order', () => {
        const action = {
            type: OPEN_ORDER
        }

        expect(modalReducer(initialState, action)).toEqual({
            ...initialState,
            visibleOrder: true
        })
    })

    it('close order', () => {
        const initialStateCloseModal = {
            visibleOrder: true,
            errorOrder: false
        }

        const action = {
            type: CLOSE_ORDER
        }

        expect(modalReducer(initialStateCloseModal, action)).toEqual({
            ...initialStateCloseModal,
            visibleOrder: false,
        })
    })

    it('open error order', () => {
        const action = {
            type: OPER_ERROR_ORDER
        }

        expect(modalReducer(initialState, action)).toEqual({
            ...initialState,
            errorOrder: true
        })
    })

    it('close error order', () => {
        const initialStateCloseError = {
            visibleOrder: false,
            errorOrder: true
        }

        const action = {
            type: CLOSE_ERROR_ORDER
        }

        expect(modalReducer(initialStateCloseError, action)).toEqual({
            ...initialStateCloseError,
            errorOrder: false
        })
    })
})