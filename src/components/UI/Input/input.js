import React from 'react';
import './input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = ['InputElement'];
    let validateError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
        validateError = <p className="Error">Please enter a valid value</p>;
    }

    switch (props.elementtype) {
        case ("input"):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ("textarea"):
            inputElement = <textarea className={inputClasses.join(' ')} {...props} onChange={props.changed} />
            break;
        case ("select"):
            inputElement = (<select className={inputClasses.join(' ')} onChange={props.changed} >
                <option key="0" value="0">Select One</option>
                {props.elementConfig.option.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props} onChange={props.changed} />
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validateError}
        </div>);
}


export default input;