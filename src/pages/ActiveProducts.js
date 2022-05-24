import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveProductItem from './ActiveProductItem';
import classes from './ActiveProducts.module.css';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useParams } from 'react-router-dom';

const ActiveProducts = () => {
    const [restaurantId, setRestaurantId] = useState('');
    const [isLoading, haveError, sendRequest] = useHttp();
    const [products, setProducts] = useState([]);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchActiveProducts = async () => {
            const data = await sendRequest('http://localhost:8080/api/admin/my-active-products', 'GET',
                {
                    'Authorization': 'Bearer: ' + token,
                });
            if (data && data.success === true) {
                setProducts(data.data);
            }
        }
        fetchActiveProducts();
    }, [])


    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(adminActions.activeProductsSelection(restaurantId));
    };

    // const activeProductsRestaurantId = useSelector(state => state.admin.activeProductsRestaurantId);

    // let products = [];
    // if (activeProductsRestaurantId === null) {
    //     products.push = {
    //         name: 'BULUNAMADI'
    //     };
    // } else {
    //     products = activeProducts.filter(product => product.restaurantId === activeProductsRestaurantId);
    // }

    if (isLoading) {
        return (
            <LoadingSpinner asOverlay />
        )
    }

    if (haveError) {
        console.log("errorActiveProduct: ", haveError)
    }
    return (
        <section
        // className={classes.activeProducts}
        >
            <ul className={classes.activeProductUl}>
                {products.map(product => (
                    <ActiveProductItem id={product.productId} product={product}
                    />
                ))}
            </ul>
        </section>
    )
};

export default ActiveProducts;