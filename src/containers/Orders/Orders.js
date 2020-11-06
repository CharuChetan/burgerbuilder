import React, { PureComponent } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorhendler from '../../hoc/withErrorHendler/withErrorHendler';

class Orders extends PureComponent {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        axios.get('order.json').then(order => {
            const fetchedOrder = [];
            for (let key in order.data) {
                fetchedOrder.push({ ...order.data[key], id: key });
            }
            this.setState({ loading: false, orders: fetchedOrder });
        }).catch(err => {
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order key={order.id}
                        indredients={order.ingredients}
                        price={+order.price} />
                })}

            </div>
        );
    }
}

export default withErrorhendler(Orders, axios);
