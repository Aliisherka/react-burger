import { CLEAR_ORDER_NUMBER, CLEAR_QUANTITY, DECREASE_INGREDIENT, GET_INGREDIENT, GET_INGREDIENT_SUCCESS, GET_ORDER_NUMBER, GET_ORDER_NUMBER_SUCCESS, INCREASE_INGREDIENT } from "../actions/ingredient"
import { ingredientReducer, initialState } from "./ingredient"


describe('ingredient reducer', () => {
    const ingredientMain = {
        __v: 0,
        _id: "643d69a5c3f7b9001cfa0941",
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        name: "Биокотлета из марсианской Магнолии",
        price: 424,
        proteins: 420,
        type: "main",
        uniqueId: "1",
      };

    it('should return the initial state', () => {
        expect(ingredientReducer(undefined, {})).toEqual(initialState)
    })  

    it('ingredient request after situation without Error', () => {
        const action = {
            type: GET_INGREDIENT
        }

        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientRequest: true
        })
    })

    it('ingredient request after Error', () => {
        const initialStateWithError = {
            ...initialState,
            ingredientFailed: true
        }

        const action = {
            type: GET_INGREDIENT
        }

        expect(ingredientReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            ingredientRequest: true, 
            ingredientFailed: false
        })
    })

    it('ingredient request success', () => {
        const initialStateSuccess = {
            ...initialState,
            ingredientRequest: true
        }

        const action = {
            type: GET_INGREDIENT_SUCCESS,
            ingredient: [1, 2, 3]
        }

        expect(ingredientReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            ingredientRequest: false,
            ingredient: [1, 2, 3]
        })
    })

    it('order request after situation without Error', () => {
        const action = {
            type: GET_ORDER_NUMBER
        }

        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            orderNumberRequest: true
        })
    })

    it('order request after Error', () => {
        const initialStateWithError = {
            ...initialState,
            orderNumberFailed: true
        }

        const action = {
            type: GET_ORDER_NUMBER
        }

        expect(ingredientReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            orderNumberFailed: false,
            orderNumberRequest: true
        })
    })

    it('order request success', () => {
        const initialStateSuccess = {
            ...initialState,
            orderNumberRequest: true
        }

        const action = {
            type: GET_ORDER_NUMBER_SUCCESS,
            orderNumber: 5
        }

        expect(ingredientReducer(initialStateSuccess, action)).toEqual({
            ...initialStateSuccess,
            orderNumber: 5,
            orderNumberRequest: false
        })
    })

    it('clear order number', () => {
        const initialStateWithNumber = {
            ...initialState,
            orderNumber: 6,
        }

        const action = {
            type: CLEAR_ORDER_NUMBER
        }

        expect(ingredientReducer(initialStateWithNumber, action)).toEqual({
            ...initialStateWithNumber,
            orderNumber: 0
        })
    })

    it('clear quantity', () => {
        const initialStateWithQuantity = {
            ...initialState,
            ingredient: [{...ingredientMain, __v: 5}]
        }

        const action = {
            type: CLEAR_QUANTITY
        }

        expect(ingredientReducer(initialStateWithQuantity, action)).toEqual({
            ...initialStateWithQuantity,
            ingredient: [ingredientMain]
        })
    })

    it('increace ingredient', () => {
        const initialStateIncrease = {
            ...initialState,
            ingredient: [ingredientMain]
        }

        const action = {
            type: INCREASE_INGREDIENT,
            id: "643d69a5c3f7b9001cfa0941"
        }
        expect(ingredientReducer(initialStateIncrease, action)).toEqual({
            ...initialStateIncrease,
            ingredient: [{...ingredientMain, __v: 1}]
        })
    })

    it('decreace ingredient', () => {
        const initialStateDecrease = {
            ...initialState,
            ingredient: [ingredientMain]
        }

        const action = {
            type: DECREASE_INGREDIENT,
            id: "643d69a5c3f7b9001cfa0941"
        }
        
        expect(ingredientReducer(initialStateDecrease, action)).toEqual({
            ...initialStateDecrease,
            ingredient: [{...ingredientMain, __v: 0}]
        })
    })
})