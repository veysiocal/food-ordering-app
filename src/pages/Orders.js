import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import classes from './Orders.module.css';

const Orders = () => {
    const items = useSelector(state => state.cart.items);
    const orderPageIsVisible = useSelector(state => state.ui.orderPageIsVisible)
    
    if(!orderPageIsVisible) {
        return (
            <p className={classes.notfoundline}>Not found any order...</p>
        )
    }
    return (
        <Card>
            <ul>
                {items.map(
                    item => (
                        <li className={classes.itemCustom} >
                            <header>
                                <h3>{item.name}</h3>
                                <div className={classes.priceCustom} >
                                    {/* ${totalPrice.toFixed(2)}{' '} */}
                                    ${item.totalPrice}{' '}

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
                                <div className={classes.actionsCustom}>
                                    <button>Onayla</button>
                                    <button>Reddet</button>
                                </div>
                            </div>
                        </li>
                    )
                )}

            </ul>
        </Card>

    );
};

export default Orders;