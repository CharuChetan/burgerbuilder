import React from "react";
import './Order.css';

const order = props => {
    const ingredients = [];

    for (let ingredient in props.indredients) {
        ingredients.push(
            {
                name: ingredient,
                amount: props.indredients[ingredient]
            })
    }

    const ingredientOutput = ingredients.map(ing => (
        <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }} key={ing.name}>{ing.name}({ing.amount})</span>
    ));

    return (
        <div className="Order">
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;