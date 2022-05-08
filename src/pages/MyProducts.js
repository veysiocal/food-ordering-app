import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyProductItem from './MyProductItem';
import classes from './ActiveProducts.module.css';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ActiveProducts = () => {
    const [isLoading, haveError, sendRequest] = useHttp();
    const [myProducts, setMyProducts] = useState([]);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const fetchMyProducts = async () => {
            const data = await sendRequest('http://localhost:8080/api/admin/businessProducts','GET',
            {
                'Authorization': 'Bearer: ' + token,
            },);
            if (data && data.success === true) {
                setMyProducts(data.data);
            }
        }
        fetchMyProducts();
    }, [])


    const dispatch = useDispatch();

    // const submitHandler = () => {
    //     console.log(restaurantId)
    //     dispatch(adminActions.activeProductsSelection(restaurantId));
    // };

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
        <section >
            <ul>
                {myProducts.map(product => (
                    <MyProductItem id={product.id} name={product.title} start={product.startTime} end={product.endTime}
                        fee={product.price} amount={product.amount} description={product.description}
                    />
                ))}
            </ul>
        </section>
    )
};

export default ActiveProducts;