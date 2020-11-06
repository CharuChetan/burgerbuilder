import * as actionType from './actionTypes';

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