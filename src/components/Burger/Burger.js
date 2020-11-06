import React from 'react';
import './burger.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const burger = props => {
    let transIngredient = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((ingred, i) => { //[...Array(props.ingredients[igKey])] = [cheese,cheese,meat,meat,becon,salad]
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    if (transIngredient.flat().length === 0) {
        transIngredient = "Please add some ingredients.";
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;