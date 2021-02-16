import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary';
import './layout.css';
import Toolbar from '../Burger/Nevigation/Toolbar/Toolbar';
import SideDrawer from '../Burger/Nevigation/SideDrawer/SideDrawer';

const layout = props => {
    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticate} />
            <SideDrawer isAuth={props.isAuthenticate} />
            <main className="content">
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticate: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);