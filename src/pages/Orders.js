import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import OrderItems from './OrderItems';
import classes from './Orders.module.css';

const Orders = () => {
    const items = useSelector(state => state.cart.orders);
    const orderPageIsVisible = useSelector(state => state.ui.orderPageIsVisible)
    const token = useSelector(state => state.auth.token);
    const [isLoading, haveError, sendRequest] = useHttp();
    const [activeOrders, setActiveOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await sendRequest('http://localhost:8080/api/orders/owner/get-orders-by-owner',
                    'GET',
                    {
                        'Authorization': 'Bearer: ' + token
                    });
                if (data && data.success === true) {
                    setActiveOrders(data.data)
                }
            } catch { }
        };
        fetchOrders()
    }, [sendRequest])

    const deleteFromActiveOrders = (orderId) => {
        setActiveOrders(activeOrders.filter(item => item.orderId !== orderId))
    };



    // if (!orderPageIsVisible) {
    //     return (
    //         <p className={classes.notfoundline}>Not found any order...</p>
    //     )
    // }

    if (isLoading) {
        <LoadingSpinner asOverlay />
    }

    if (haveError) {
        <h2>Error: {haveError}</h2>
    }
    return (
        <Card>
            {activeOrders.length !== 0 && <ul>
                {
                    activeOrders.map(
                        item => (
                            <OrderItems
                                key={item.id}
                                id={item.orderId}
                                price={item.price}
                                status={item.status}
                                deleteFromActiveOrders={deleteFromActiveOrders}
                            />
                        )
                    )
                }
            </ul>}
            {activeOrders.length === 0 && <h2>There is no any order.</h2>}
        </Card >

    );
};

export default Orders;