import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchasseBurgerSuccess = (orderID, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: orderID,
        orderData: orderData
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchasseBurgerFailed = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchasseBurgerInit = () => {
    return {
        type: actionType.PURCHASE_BURGER_INIT
    }
}

export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth=' + token, orderData).then(response => {
            dispatch(purchasseBurgerSuccess(response.data.name, orderData));
        }).catch(err => {
            console.log(err)
            dispatch(purchasseBurgerFailed(err));
        });
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart(token));
        const queryPerm = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json' + queryPerm).then(order => {
            const fetchedOrder = [];
            for (let key in order.data) {
                fetchedOrder.push({ ...order.data[key], id: key });
            }
            dispatch(fetchOrderSuccess(fetchedOrder));
        }).catch(err => {
            dispatch(fetchOrderFailed(err))
        });
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDER_START
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionType.FETCH_ORDER_FAILED,
        error: error
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}