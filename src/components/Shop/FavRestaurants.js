import React from 'react';
import { useSelector } from 'react-redux';
import classes from './FavRestaurants.module.css';
import RestaurantItem from './RestaurantItem';

const FavRestaurants = () => {
    let favRestaurants = useSelector(state => state.ui.favoriteRestaurants);
    if(!favRestaurants) {
        return (
            <h1>There is no any Fav Restaurant.</h1>
        )
    }
  return (
    <section className={classes.productsCustom}>
      <ul>
        {favRestaurants.map(restaurant => (
          <RestaurantItem key={restaurant.id} id={restaurant.id} favorited={true} title={restaurant.title} description={restaurant.description} />)
        )}
      </ul>
    </section>
  );
};

export default FavRestaurants;