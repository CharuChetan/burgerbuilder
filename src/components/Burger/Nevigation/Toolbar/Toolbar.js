import React from 'react';
import './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
    <header className="Toolbar">
        <div>MENU</div>
        <div className="logo">
            <Logo />
        </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;