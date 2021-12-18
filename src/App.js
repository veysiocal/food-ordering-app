import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Restaurants from './components/Shop/Restaurants';
import Notification from './components/UI/Notification';
import { sendDataToFirebase, fetchCartData } from './store/cart-actions';

import { Redirect, Route } from 'react-router-dom';
import FavRestaurants from './components/Shop/FavRestaurants';


let isInitial = true;

function App() {
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const isChanged = useSelector(state => state.cart.changed);
  // const isSelected = useSelector(state => state.ui.isSelected);
  const selectedRestaurant = useSelector(state => state.ui.selectedRestaurant);

  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)
  const notificationVisibility = useSelector(state => state.ui.notificationIsVisible);
  useEffect(() => {

    dispatch(fetchCartData())
  }, [dispatch])
  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isChanged === false) {
      return;
    }

    dispatch(sendDataToFirebase(cart)) // for now will return function not object.
  }, [cart, dispatch]); // dispatch does not change, but we add it also.

  return (
    <Fragment>
      {notification && notificationVisibility.show === true && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsVisible && <Cart />}
        {/* {!isSelected && < Restaurants />} */}
        <Route path='/'>
          <Redirect to='/restaurants'/>
        </Route>
        <Route path='/restaurants'>
          <Restaurants />
        </Route>
        <Route path='/products/:restaurantId'>
          <Products/>
        </Route>
        <Route path='/favorite-restaurants'>
          <FavRestaurants />
        </Route>
        {/* {isSelected && < Products selected={selectedRestaurant.id} />} */}
      </Layout>
    </Fragment>

  );
}

export default App;
