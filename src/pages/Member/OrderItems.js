import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { useHttp } from "../../hooks/use-http";
import ErrorModal from '../../components/UI/ErrorModal';

import classes from './OrderItems.module.css';

const OrderItems = props => {
    const orderId = props.id;

    const [isLoading, haveError, sendRequest, clearError] = useHttp();
    const [orderLines, setOrderLines] = useState([]);

    const token = useSelector(state => state.auth.token);

    console.log("orderıd: ", orderId)
    useEffect(() => {
        const fetchOrderLines = async () => {
            try {
                const data = await sendRequest(`http://localhost:8080/api/orders/member/get-order-lines/${orderId}`,
                    'GET',
                    {
                        'Authorization': 'Bearer: ' + token
                    }
                );
                if (data && data.success === true) {
                    console.log("DATA_ORDER: ", data)
                    setOrderLines(data.data)
                }
            } catch { }
        }
        fetchOrderLines();
    }, [sendRequest])

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <li key={props.key} className={classes.itemCustom}>
                <header>Sipariş Id: {orderId}</header>
                <span>Durum: {props.status}</span>
                <Card className={classes.cartCustom}>
                    <ul>
                        {orderLines.map((item) => (
                            <li className={classes.itemCustom}>
                                lineId: {item.lineId}
                                <header>
                                    <h3>ProductId: {item.productName}</h3>
                                    <div className={classes.priceCustom} >
                                        {/* ${total.toFixed(2)}{' '} */}
                                        {/* ${total}{' '} */}

                                        {/* <span className={classes.itempriceCustom}>(${price.toFixed(2)}/item)</span> */}
                                        <span className={classes.itempriceCustom}>(₺{item.price}/item)</span>

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
        </React.Fragment>
    )

};

export default OrderItems;