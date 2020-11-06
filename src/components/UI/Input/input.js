import React from 'react';
import './input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate) {
        inputClasses.push('Invalid');
    }

    switch (props.elementtype) {
        case ("input"):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ("textarea"):
            inputElement = <textarea className={inputClasses.join(' ')} {...props} onChange={props.changed} />
            break;
        case ("select"):
            inputElement = (<select className={inputClasses.join(' ')} >
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
        </div>);
}


export default input;