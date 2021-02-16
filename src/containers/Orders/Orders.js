import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorhendler from '../../hoc/withErrorHendler/withErrorHendler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';

class Orders extends PureComponent {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.props.onOrderFetch(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id}
                    indredients={order.ingredients}
                    price={+order.price} />
            });
        };

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorhendler(Orders, axios));
