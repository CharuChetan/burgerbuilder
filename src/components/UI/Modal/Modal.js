import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/BackDrop';

const model = (props) => (
    <Aux>
        <Backdrop show={props.show} closed={props.backdropClose} />
        <div className='Modal' style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
        }}>
            {props.children}
        </div>
    </Aux>
);

export default model;