import React from 'react';
import burgerLogo from '../../assets/img/logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo">
        <img src={burgerLogo} alt="My Burger" />
    </div>
);

export default logo;