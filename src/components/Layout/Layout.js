import React from 'react';
import Aux from '../../hoc/Auxilary';
import './layout.css';
import Toolbar from '../Burger/Nevigation/Toolbar/Toolbar';
import SideDrawer from '../Burger/Nevigation/SideDrawer/SideDrawer';

const layout = props => {
    return (
        <Aux>
            <Toolbar />
            <SideDrawer />
            <main className="content">
                {props.children}
            </main>
        </Aux>
    );
}

export default layout;