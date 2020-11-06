import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = props => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it test well !</h1>
            <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" cliked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType="Success" cliked={props.checkoutContinued}>Continue</Button>
        </div >
    );
}

export default checkoutSummary;