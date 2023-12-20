import { ADD_INGRIDIENT, CLEAR_COSTRUCTOR, DELETE_INGREDIENT, DRAGGE_BUN, DRAGGE_INGREDIENT, GIVE_UNIQUE_ID, INCREASE_BUN, REORDER_CONSTRUCTOR } from "../actions/constructor"
import { constructorReducer, initialState } from "./constructor"


describe('constructor reducer', () => {
    const ingredientBun = {
      __v: 0,
      _id: "643d69a5c3f7b9001cfa093c",
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      name: "Краторная булка N-200i",
      price: 1255,
      proteins: 80,
      type: "bun",
      uniqueId: "1",
    };

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

    const ingredientSauce = {
        __v: 0,
        _id: "643d69a5c3f7b9001cfa0943",
        calories: 14,
        carbohydrates: 11,
        fat: 22,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        name: "Соус фирменный Space Sauce",
        price: 80,
        proteins: 50,
        type: "sauce",
        uniqueId: "2"
    }

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })

    it('dragge ingredient', () => {
        const action = {
            type: DRAGGE_INGREDIENT,
            ingredient: [ingredientMain],
            _id: '643d69a5c3f7b9001cfa0941'
        }

        expect(constructorReducer(initialState, action)).toEqual({
            ...initialState,
            draggedIngredient: [ingredientMain]
        })
    })

    it('dragge bun', () => {
        const action = {
            type: DRAGGE_BUN,
            _id: '643d69a5c3f7b9001cfa093c',
            ingredient: [ingredientBun]
        }

        expect(constructorReducer(initialState, action)).toEqual({
            ...initialState,
            draggedBun: ingredientBun
        })
    })

    it('delete ingredient', () => {
        const  initialStateForDeleting = {
            ...initialState,
            draggedIngredient: [ingredientMain, ingredientSauce]
        }

        const action = {
            type: DELETE_INGREDIENT,
            uniqueId: '1'
        }

        expect(constructorReducer(initialStateForDeleting, action)).toEqual({
            ...initialStateForDeleting,
            draggedIngredient: [ingredientSauce]
        })
    })

    it('clear constructor', () => {
        const initialStateWithIngredient = {
            draggedBun: [ingredientBun],
            draggedIngredient: [ingredientMain, ingredientSauce]
        }

        const action = {
            type: CLEAR_COSTRUCTOR
        }

        expect(constructorReducer(initialStateWithIngredient, action)).toEqual({
            ...initialStateWithIngredient,
            draggedBun: undefined,
            draggedIngredient: []
        })
    })

    it('reorder constructor', () => {
        const initialStateToReorder = {
            ...initialState,
            draggedIngredient: [ingredientMain, ingredientSauce]
        }

        const action = {
            type: REORDER_CONSTRUCTOR,
            order: 0,
            index: 1,
            item: ingredientMain
        }

        expect(constructorReducer(initialStateToReorder, action)).toEqual({
            ...initialStateToReorder,
            '0': ingredientMain,
            draggedIngredient: [ingredientSauce, ingredientMain]
        })
    })

    it('increase bun', () => {
        const initialStateIncrease = {
            ...initialState,
            draggedBun: ingredientBun
        }

        const action = {
            type: INCREASE_BUN,
        }

        expect(constructorReducer(initialStateIncrease, action)).toEqual({
            ...initialStateIncrease,
            draggedBun:  {...ingredientBun, __v: 1}
        })
    })

    it('add ingredient', () => {
        const action = {
            type: ADD_INGRIDIENT,
            payload: ingredientMain
        }

        expect(constructorReducer(initialState, action)).toEqual({
            ...initialState,
            draggedIngredient: [ingredientMain]
        })
    })
})