import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyProductItem from './MyProductItem';
import { adminActions } from '../store/admin-slice';
import { useHttp } from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import classes from './MyProduct.module.css';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ActiveProducts = () => {
    const [isLoading, haveError, sendRequest] = useHttp();
    const [myProducts, setMyProducts] = useState([]);
    const [enteredRestaurant, setEnteredRestaurant] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);

    const token = useSelector(state => state.auth.token);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const filteredProduct = queryParams.get('filter');
    const history = useHistory();
    
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


    let showProducts = myProducts;

    const enteredRestaurantHandler = (event) => {
        setEnteredRestaurant(event.target.value)
    };

    if (filteredProduct) {
        showProducts = myProducts.filter(restaurant => restaurant.title.includes(filteredProduct));
    } else {
        showProducts = myProducts;
    }

    const filteringRestaurant = () => {
        history.push(`/admin/my-products?filter=${enteredRestaurant}`);
        setEnteredRestaurant('');
    };

    const cleanHandler = () => {
        showProducts = myProducts;
    }

    const selectDistrictHandler = (e) => {
        setSelectedStatus(e.target.value);
    };

    if (selectedStatus !== null) {
        if (selectedStatus === 'Tümü') {
            showProducts = showProducts;
        } else {
            showProducts = showProducts.filter(product => product.status === selectedStatus);
            console.log("how: ", showProducts)
        }
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
            <div>
                <select id='districtselect' className={classes.selector} placeholder='Seçim Yapınız' onChange={selectDistrictHandler}>
                    <option value='Tümü' >Bölge Seçiniz</option>
                    <option value='satista'>Satıştaki Ürünler</option>
                    <option value='satis disi'>Satış Dışı Ürünler</option>
                </select>
            </div>
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