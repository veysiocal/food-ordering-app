import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/UI/Card";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHttp } from "../hooks/use-http";


import classes from './OrderItems.module.css';

const OrderItems = props => {
    const [isLoading, haveError, sendRequest] = useHttp();
    const [adminPageOrders, setAdminPageOrders] = useState([]);

    const token = useSelector(state => state.auth.token);
    useEffect(() => {
        const getAdminPageOrders = async () => {
            const data = await sendRequest('http://localhost/api/admin/orders/getOrderLines/' + props.orderId,
                'GET',
                {
                    'Authorization': 'Bearer: ' + token
                });
            if (data && data.success === true) {
                setAdminPageOrders(data.data);
            }
        }
        getAdminPageOrders()
    }, [sendRequest]);

    if (isLoading) {
        <LoadingSpinner asOverlay />
    }

    if (haveError) {
        <h2>Error: {haveError}</h2>
    }
    return (
        <li key={props.key} className={classes.itemCustom}>
            <header>Sipariş Id: {props.orderId}</header>
            <span>Durum: {props.status}</span>
            <Card className={classes.cartCustom}>
                <ul>
                    {adminPageOrders.map((item) => (
                        <li className={classes.itemCustom}>
                            lineId: {item.lineId}
                            <header>
                                <h3>ProductId: {item.productName}</h3>
                                <div className={classes.priceCustom} >
                                    {/* ${total.toFixed(2)}{' '} */}
                                    {/* ${total}{' '} */}

                                    {/* <span className={classes.itempriceCustom}>(${price.toFixed(2)}/item)</span> */}
                                    <span className={classes.itempriceCustom}>(${item.price}/item)</span>

                                </div>
                            </header>
                            <div
                                className={classes.detailsCustom}
                            >
                                <div className={classes.quantityCustom} >
                                    x <span>{item.quantity}</span>
                                </div>

                            </div>
                            <hr />
                        </li>
                    ))}
                </ul>
                <hr></hr>
            </Card>
        </li>
    )
};

export default OrderItems;