import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../../src/axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/input';

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
                    required: true
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
                    maxLength: 5
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
            orderData: formData
        }

        axios.post('/order.json', order).then(response => {
            //this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ loading: false });
            console.log(err);
        });
    }

    changedHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...this.state.orderForm };
        const updatedFrom = { ...updateOrderForm[inputIdentifier] };
        updatedFrom.value = event.target.value;
        updatedFrom.valid = this.checkValidation(updatedFrom.value, updatedFrom.validation);
        updatedFrom.touched = true;
        updateOrderForm[inputIdentifier] = updatedFrom;
        let frmValid = true;
        for (let validFrm in updateOrderForm) {
            frmValid = updateOrderForm[validFrm].valid && frmValid;
        }
        this.setState({ orderForm: updateOrderForm, formValid: frmValid });
    }

    checkValidation = (value, rules) => {
        let isvalid = true;
        if (rules.required) {
            isvalid = value.trim() !== '' && isvalid;
        }
        if (rules.minLength) {
            isvalid = value.length >= rules.minLength && isvalid;
        }
        if (rules.maxLength) {
            isvalid = value.length <= rules.maxLength && isvalid;
        }

        return isvalid;
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
        if (this.state.loading) {
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
        ings: state.ingredients,
        price: state.Totalprice,
    }
};

export default connect(mapStateToProps)(ContactData);