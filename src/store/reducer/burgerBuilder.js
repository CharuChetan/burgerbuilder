import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    Totalprice: 2,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    Salad: 1,
    Bacon: 2,
    Cheese: 3,
    Meat: 5,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                Totalprice: state.Totalprice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                Totalprice: state.Totalprice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                Totalprice: 2,
                error: false,
                building: false
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;

