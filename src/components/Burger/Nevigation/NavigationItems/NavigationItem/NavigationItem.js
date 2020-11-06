import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
    <li className="NavigatioItem">
        <NavLink exact={props.exact} to={props.link}>{props.children}</NavLink>
    </li>
);

export default navigationItem