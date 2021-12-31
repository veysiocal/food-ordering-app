import React from 'react';
import { useSelector } from 'react-redux';
import AboutRestaurant from './AboutRestaurant';

const Admin = () => {
    const restaurants = useSelector(state => state.admin.restaurants)
    const test = useSelector(state => state.admin.restaurantExist);
    const hdnd = () => {
        console.log(restaurants);
        console.log(test);
    }
    return (
        <React.Fragment>
            <AboutRestaurant />
            <section>
                <button onClick={hdnd}></button>
            </section >
        </React.Fragment>

    );
}
export default Admin;