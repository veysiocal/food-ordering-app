import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import Restaurants from './components/Shop/Restaurants';
import Notification from './components/UI/Notification';
import { sendDataToFirebase, fetchCartData } from './store/cart-actions';

import { Redirect, Route, Switch } from 'react-router-dom';
import FavRestaurants from './components/Shop/FavRestaurants';
import Admin from './pages/Admin';
import HomePage from './pages/Admin/HomePage';
import AddProduct from './pages/AddProduct';
import ActiveProducts from './pages/ActiveProducts';
import MyProducts from './pages/MyProducts';

import Orders from './pages/Orders';
import Login from './pages/Auth/Login';

import Layout from './components/Layout/Layout';
import AuthLayout from './components/Layout/AuthLayout';
import AdminLayout from './components/Layout/AdminLayout';
import ProductLayout from './components/Layout/ProductLayout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { useAuth } from './hooks/use-auth';
import MyOrders from './pages/Member/MyOrders';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const [isLoading] = useAuth();

  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const isChanged = useSelector(state => state.cart.changed);
  // const isSelected = useSelector(state => state.ui.isSelected);

  const notification = useSelector(state => state.ui.notification)
  const notificationVisibility = useSelector(state => state.ui.notificationIsVisible);
  // useEffect(() => {

  //   dispatch(fetchCartData())
  // }, [dispatch])
  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (isChanged === false) {
      return;
    }

    // dispatch(sendDataToFirebase(cart)) // for now will return function not object.
  }, [cart, dispatch]); // dispatch does not change, but we add it also.

  const token = useSelector(state => state.auth.token);
  const userType = useSelector(state => state.auth.userType);
  const businessId = useSelector(state => state.auth.businessId);
  console.log("busi: ", businessId)
  let routes;

  if (token) {
    if (userType === 'owner') {
      if (businessId === null ) {
        routes = (
          <>
            <Redirect to='/newOwner' /> 
            <Switch>
            <Route path='/newOwner' >
              {businessId === null && <Admin />}
            </Route>
            </Switch>

          </>
        )
      } else {
        routes = (
          < AdminLayout >
            <Redirect to="/admin/my-products" />
            <Switch>
              <Route path='/admin/active-products'>
                <ActiveProducts />
              </Route>
              <Route path='/admin/my-products'>
                <MyProducts />
              </Route>
              <Route path='/admin/add-product'>
                <AddProduct />
              </Route>
              <Route path='/admin/orders'>
                <Orders />
              </Route>
              {/* <Route path='/admin' > */}
                {/* {businessId === null || businessId === undefined && <Admin />} */}
                {/* {businessId !== null && businessId !== undefined && <HomePage />} */}
                {/* <Admin /> */}
              {/* </Route> */}
              <Redirect from='*' to='/admin/active-products' />
            </Switch>
          </AdminLayout>
        )
      }
    } else {
      routes = (
        <Switch>
          <Route path='/products'>
            <ProductLayout>
              {cartIsVisible && <Cart />}
              <Products />
            </ProductLayout>
          </Route>
          <Route path='/' >
            <Redirect to="/restaurants" />
            <Layout>
              {cartIsVisible && <Cart />}
              <Switch>
                <Route path='/' exact>
                  <Redirect to='/restaurants' />
                </Route>
                <Route path='/restaurants'>
                  <Restaurants />
                </Route>
                <Route path='/favorite-restaurants'>
                  <FavRestaurants />
                </Route>
                <Route path='/my-orders'>
                  <MyOrders />
                </Route>
              </Switch>
            </Layout>
          </Route>
        </Switch>
      )
    }
  } else {
    routes = (
      <Switch>
        <Route path='/auth'>
          <AuthLayout>
            <Login />
          </AuthLayout>
        </Route>
        <Route path='/products'>
          <ProductLayout>
            <Products />
          </ProductLayout>
        </Route>
        <Route path='/' >
          <Layout>
            <Switch>
              <Route path='/' exact>
                <Redirect to='/restaurants' />
              </Route>
              <Route path='/restaurants'>
                <Restaurants />
              </Route>
            </Switch>
          </Layout>
          <Redirect to='/restaurants' />
        </Route>
      </Switch>
    )
  }
  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (notification && notificationVisibility.show === true && <Notification status={notification.status} title={notification.title} message={notification.message} button={notification.button} maps={notification.maps} coordinates={notification.coordinates}
      openMap={notification.openMap}
      />)}
      {!isLoading && <Switch>{routes}</Switch>}
    </Fragment>
  );
}

export default App;
