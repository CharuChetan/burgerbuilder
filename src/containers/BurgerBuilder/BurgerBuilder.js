import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../../src/axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import withErrorHendler from '../../hoc/withErrorHendler/withErrorHendler';
import * as burgerBuilderAction from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        Totalprice: 2,
        purchasable: false,
        purchasing: false
    };

    updatePurchase = (ingrt) => {
        const sum = Object.values(ingrt).reduce((sum, value) => sum += value, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelHendler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHendler = () => {
        this.props.history.push('/checkout');
    }

    render() {

        const disabledCount = { ...this.props.indg };
        for (let key in disabledCount) {
            disabledCount[key] = disabledCount[key] <= 0
        }

        let ordersummary = null;

        let burger = <Spinner />;
        if (this.props.indg) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.indg} />
                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientsAdded={this.props.addIngredient}
                        ingredientRemove={this.props.removeIngredient}
                        disable={disabledCount}
                        purchasable={this.updatePurchase(this.props.indg)}
                        orderBtn={this.updatePurchase}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            ordersummary = (
                <OrderSummary
                    ingredients={this.props.indg}
                    purchaseCancel={this.cancelHendler}
                    purchaseContinue={this.purchaseContinueHendler}
                    totalPrice={this.props.totalPrice} />
            );
        }

        if (!this.props.indg) {
            ordersummary = <Spinner />;
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} backdropClose={this.cancelHendler}>
                    {ordersummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        indg: state.ingredients,
        totalPrice: state.Totalprice
    }
}

const mapDispatchProps = dispatch => {
    return {
        addIngredient: (inrgName) => dispatch(burgerBuilderAction.addIngredient(inrgName)),
        removeIngredient: (inrgName) => dispatch(burgerBuilderAction.removeIngredient(inrgName))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(withErrorHendler(BurgerBuilder, axios));