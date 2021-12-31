import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Restaurants from './components/Shop/Restaurants';
import Notification from './components/UI/Notification';
import { sendDataToFirebase, fetchCartData } from './store/cart-actions';

import { Redirect, Route, Switch } from 'react-router-dom';
import FavRestaurants from './components/Shop/FavRestaurants';
import Admin from './pages/Admin';
import AdminLayout from './components/Layout/AdminLayout';
import AddProduct from './pages/AddProduct';
import ActiveProducts from './pages/ActiveProducts';
import Orders from './pages/Orders';

import Login from './pages/Auth/Login';
import MainHeader from './components/Layout/MainHeader';

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
      <Switch>

        <Route path='/auth'>
          <MainHeader />
          <Login />
        </Route>
        <Route path='/admin'>
          < AdminLayout >
            <Switch>
              <Route path='/admin/active-products'>
                <ActiveProducts />
              </Route>
              <Route path='/admin/add-product'>
                <AddProduct />
              </Route>
              <Route path='/admin/orders'>
                <Orders />
              </Route>
              <Route path='/admin' >
                < Admin />
              </Route>
            </Switch>
          </AdminLayout>
        </Route>
        <Route path='/' >
          <Layout>
            {cartIsVisible && <Cart />}
            <Switch>
              <Route path='/' exact>
                <Redirect to='/restaurants' />
              </Route>

              <Route path='/restaurants'>
                <Restaurants />
              </Route>
              <Route path='/products/:restaurantId'>
                <Products />
              </Route>
              <Route path='/favorite-restaurants'>
                <FavRestaurants />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Fragment>

  );
}

export default App;
