import * as actionType from './actionTypes';
import axios from '../../../src/axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const setIngredient = (ingred) => {
    return {
        type: actionType.SET_INGREDIENTS,
        ingredients: ingred
    }
}

export const fetchIngredientFailed = (ingred) => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-f3665-default-rtdb.firebaseio.com/ingredients.json')
            .then(result => {
                dispatch(setIngredient(result.data))
            })
            .catch(err => {
                dispatch(fetchIngredientFailed())
            })
    }
}