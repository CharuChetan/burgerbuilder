import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.entries(props.ingredients).map((ingt, key) => {
        return <li key={key}><span style={{ textTransform: 'capitalize' }}>{ingt[0]}</span> : {ingt[1]}</li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : ${props.totalPrice}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" cliked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" cliked={props.purchaseContinue}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;