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

    const businessId = useSelector(state => state.auth.businessId);
    useEffect(() => {
        const fetchActiveProducts = async () => {
            const data = await sendRequest('http://localhost:8080/api/admin/businessProducts?businessId=' + businessId)
            if (data && data.success === true) {
                setProducts(data.data);
            }
        }
        fetchActiveProducts();
    }, [sendRequest])


    const dispatch = useDispatch();

    const submitHandler = () => {
        console.log(restaurantId)
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

    if(haveError) {
        console.log("errorActiveProduct: ",haveError)
      }
    return (
        <section className={classes.activeProducts}>
            <ul>
                {products.map(product => (
                    <ActiveProductItem id={product.id} name={product.name} restaurantId={product.restaurantId}
                        type={product.type} date={product.date} start={product.start} end={product.end}
                        fee={product.price} amount={product.amount} description={product.description}
                    />
                ))}
            </ul>
        </section>
    )
};

export default ActiveProducts;