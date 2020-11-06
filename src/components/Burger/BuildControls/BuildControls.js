import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const buildControls = props => (
    <div className="buildControl">
        <h4>Current Price : ${props.price}</h4>
        {controls.map(ctrl => (
            <BuildControl
                label={ctrl.label}
                type={ctrl.type}
                key={ctrl.label}
                added={() => props.ingredientsAdded(ctrl.type)}
                remove={() => props.ingredientRemove(ctrl.type)}
                disbleBtn={props.disable[ctrl.type]} />
        ))}
        <button className="OrderButton" disabled={!props.purchasable} onClick={props.ordered}>Order Now</button>
    </div>
)

export default buildControls;