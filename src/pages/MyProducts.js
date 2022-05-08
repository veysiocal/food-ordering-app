import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyProductItem from './MyProductItem';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import classes from './MyProduct.module.css';

const ActiveProducts = () => {
    const [isLoading, haveError, sendRequest] = useHttp();
    const [myProducts, setMyProducts] = useState([]);
    const [enteredRestaurant, setEnteredRestaurant] = useState('');
    const [showProducts, setShowProducts] = useState([]);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchMyProducts = async () => {
            const data = await sendRequest('http://localhost:8080/api/admin/get-products', 'GET',
                {
                    'Authorization': 'Bearer: ' + token,
                });
            if (data && data.success === true) {
                setMyProducts(data.data);
            }
        }
        fetchMyProducts();
    }, [sendRequest]);

    useEffect(() => {
        setShowProducts(myProducts)
    }, [myProducts])

    const enteredRestaurantHandler = (event) => {
        setEnteredRestaurant(event.target.value)
    };


    const filteringRestaurant = () => {
        console.log("entereedRes: ", enteredRestaurant)
        setShowProducts(myProducts.filter(product => product.title.includes(enteredRestaurant)));
        console.log("showProd: ", showProducts)
        setEnteredRestaurant('');
    };

    const cleanHandler = () => {
        setShowProducts(myProducts);
    }

    if (isLoading) {
        return (
            <LoadingSpinner asOverlay />
        )
    }

    if (haveError) {
        console.log("errorActiveProduct: ", haveError)
    }
    return (
        <section >
            <div className={classes.filtering} >
                <input onChange={enteredRestaurantHandler} value={enteredRestaurant} placeholder='Restoran ara...'></input>
                <div>
                    <button onClick={filteringRestaurant} className={classes.filterButton}><i class="fas fa-search"></i>
                    </button>
                    <button onClick={cleanHandler} className={classes.filterButton}>Temizle</button>
                </div>
            </div>
            <ul>
                {showProducts.map(product => (
                    <MyProductItem productId={product.productId} title={product.title} description={product.description} status={product.status}
                    />
                ))}
            </ul>
        </section>
    )
};

export default ActiveProducts;