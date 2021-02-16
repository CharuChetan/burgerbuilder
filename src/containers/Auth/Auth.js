import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import './auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';
import { checkValidation } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
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
        },
        isSignUp: true
    }

    submitHendler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }


    changedHandler = (event, inputIdentifier) => {
        const updateOrderForm = { ...this.state.controls };
        const updatedFrom = { ...updateOrderForm[inputIdentifier] };
        updatedFrom.value = event.target.value;
        updatedFrom.valid = checkValidation(updatedFrom.value, updatedFrom.validation);
        updatedFrom.touched = true;
        updateOrderForm[inputIdentifier] = updatedFrom;
        this.setState({ controls: updateOrderForm });
    }

    onClickedHendler = () => {
        this.setState({ isSignUp: !this.state.isSignUp })
    }

    componentDidMount() {
        if (!this.props.burgerBuilding && this.props.redirectionURL !== '/') {
            this.props.onRedirectUrl();
        }
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(frmValue => (
            <Input
                key={frmValue.id}
                elementtype={frmValue.config.elementType}
                elementConfig={frmValue.config.elementConfig}
                value={frmValue.config.value}
                changed={(event) => this.changedHandler(event, frmValue.id)}
                invalid={!frmValue.config.valid}
                touched={frmValue.config.touched}
                shouldValidate={frmValue.config.validation} />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let redirctLink = null;
        if (this.props.isAuth) {
            redirctLink = <Redirect to={this.props.redirectionURL} />;
        }

        let errorHead = null;
        if (this.props.error) {
            errorHead = (<p style={{ color: "red" }}>{this.props.error}</p>)
        }

        return (
            <div className="Auth">
                {redirctLink}
                {errorHead}
                <form onSubmit={this.submitHendler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" cliked={this.onClickedHendler}>Switch to {this.state.isSignUp ? 'Signin' : 'Signup'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        burgerBuilding: state.burgerBuilder.building,
        redirectionURL: state.auth.redirectURL
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onRedirectUrl: () => dispatch(actions.authRedirectUrl('/'))
    }
}

export default connect(mapDispatchToProps, mapDispatchToProp)(Auth);