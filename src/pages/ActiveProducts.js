import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveProductItem from './ActiveProductItem';
import classes from './ActiveProducts.module.css';
import { useHistory } from 'react-router-dom';
import { adminActions } from '../store/admin-slice';

const ActiveProducts = () => {
    const [restaurantId, setRestaurantId] = useState('');

    const activeProducts = useSelector(state => state.admin.activeProducts);

    const idInputHandler = (event) => {
        setRestaurantId(event.target.value);
    };

    const dispatch = useDispatch();

    const submitHandler = () => {
        console.log(restaurantId)
        dispatch(adminActions.activeProductsSelection(restaurantId));
    };

    const activeProductsRestaurantId = useSelector(state => state.admin.activeProductsRestaurantId);
    console.log("buul?", activeProductsRestaurantId)
    let products = [];
    if (activeProductsRestaurantId === null) {
        products.push = {
            name: 'BULUNAMADI'
        };
    } else {
        products = activeProducts.filter(product => product.restaurantId === activeProductsRestaurantId);
    }

    return (
        <section className={classes.activeProducts}>
            <div>
                <label>Restoran Id:</label>
                <input onChange={idInputHandler} ></input>
                <button onClick={submitHandler}>Ürünleri Listele</button>
            </div>
            <ul>
                {products.map(product => (
                    <ActiveProductItem id={product.id} name={product.name} restaurantId={product.restaurantId}
                        type={product.type} date={product.date} start={product.start} end={product.end}
                        fee={product.price} amount={product.amount} description={product.description}
                        amount={product.amount}
                    />
                ))}
            </ul>
        </section>
    )
};

export default ActiveProducts;