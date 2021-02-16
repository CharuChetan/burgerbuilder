import React from "react";
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDDrawer.css';

const sideDrawer = props => {

    return (
        <div className="SideDrawer">
            <div className="logo-div">
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
    );
}

export default sideDrawer;