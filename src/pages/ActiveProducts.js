import React from 'react';
import { useSelector } from 'react-redux';
import ActiveProductItem from './ActiveProductItem';
import classes from './ActiveProducts.module.css';

const ActiveProducts = () => {
    const activeProducts = useSelector(state => state.admin.activeProducts);
    const products = activeProducts.filter(product => product.restaurantId === 'restaurant1');

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