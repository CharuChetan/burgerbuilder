import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../../src/axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/input';
import * as action from '../../../store/actions/index';
import withErrorHendler from '../../../hoc/withErrorHendler/withErrorHendler';
import { checkValidation } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    placeholder: 'Your Postal Code'
                },
                validation: {},
                value: 'fastest',
                valid: true,
            },
        },
        formValid: false
    }

    orderHendler = () => {
        this.setState({ loading: true });
        let formData = {};
        for (let fromIdenifire in this.state.orderForm) {
            formData[fromIdenifire] = this.state.orderForm[fromIdenifire].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    changedHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...this.state.orderForm };
        const updatedFrom = { ...updateOrderForm[inputIdentifier] };
        updatedFrom.value = event.target.value;
        updatedFrom.valid = checkValidation(updatedFrom.value, updatedFrom.validation);
        updatedFrom.touched = true;
        updateOrderForm[inputIdentifier] = updatedFrom;
        let frmValid = true;
        for (let validFrm in updateOrderForm) {
            frmValid = updateOrderForm[validFrm].valid && frmValid;
        }
        this.setState({ orderForm: updateOrderForm, formValid: frmValid });
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (<form>
            {formElementArray.map(frmValue => (
                <Input
                    key={frmValue.id}
                    elementtype={frmValue.config.elementType}
                    elementConfig={frmValue.config.elementConfig}
                    value={frmValue.config.value}
                    changed={(event) => this.changedHandler(event, frmValue.id)}
                    invalid={!frmValue.config.valid}
                    touched={frmValue.config.touched}
                    shouldValidate={frmValue.config.validation} />
            ))}
            <Button btnType="Success" cliked={this.orderHendler} disabled={!this.state.formValid}>Order</Button>
        </form>);
        if (this.props.loading) {
            form = (<Spinner />);
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.Totalprice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localId
    }
};

const mapDispatchProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(action.purchaseOrder(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchProps)(withErrorHendler(ContactData, axios));