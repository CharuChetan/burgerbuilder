import React from "react";
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const navigations = (props) => (
    <ul className="NavigatioItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
);

export default navigations;