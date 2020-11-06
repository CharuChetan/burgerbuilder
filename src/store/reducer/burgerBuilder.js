import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: {
        bacon: 0,
        salad: 0,
        meat: 0,
        cheese: 0,
    },
    Totalprice: 2,
}

const INGREDIENT_PRICE = {
    salad: 1,
    bacon: 2,
    cheese: 3,
    meat: 5,
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
                Totalprice: state.Totalprice + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                Totalprice: state.Totalprice - INGREDIENT_PRICE[action.ingredientName]
            }
        default:
            return state;
    }
}

export default reducer;

