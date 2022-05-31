import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useHttp } from '../../hooks/use-http';
import OrderItems from './OrderItems';
import ErrorModal from '../../components/UI/ErrorModal';
import classes from './MyOrders.module.css';

const MyOrders = props => {

    const [isLoading, haveError, sendRequest, clearError] = useHttp();

    const [orders, setOrders] = useState([]);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const data = await sendRequest('http://localhost:8080/api/orders/member/get-orders-by-member', 'GET',
                    {
                        'Authorization': 'Bearer: ' + token
                    });
                console.log("DATAMYOREDERS: ", data)
                if (data && data.success === true) {
                    setOrders(data.data);
                }
            } catch { }
        }
        fetchMyOrders();
    }, [sendRequest])

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <Card className={classes.cartCustom}>
                {orders.length !== 0 && <ul>
                    {orders.map(item => (<OrderItems
                        key={item.id}
                        id={item.orderId}
                        price={item.price}
                        status={item.status}
                    />))}
                </ul>}
                {orders.length === 0 && <div >Sipari bulunamadı...</div>}
            </Card>
        </React.Fragment>
    )
};

export default MyOrders;