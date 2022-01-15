import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Products from './components/Shop/Products';
import Restaurants from './components/Shop/Restaurants';
import Notification from './components/UI/Notification';
import { sendDataToFirebase, fetchCartData } from './store/cart-actions';

import { Redirect, Route, Switch } from 'react-router-dom';
import FavRestaurants from './components/Shop/FavRestaurants';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import ActiveProducts from './pages/ActiveProducts';
import Orders from './pages/Orders';
import Login from './pages/Auth/Login';

import Layout from './components/Layout/Layout';
import AuthLayout from './components/Layout/AuthLayout';
import AdminLayout from './components/Layout/AdminLayout';
import ProductLayout from './components/Layout/ProductLayout';
import { adminActions } from './store/admin-slice';

let isInitial = true;


const DUMMY_RESTAURANTS = [
  {
    id: 'restaurant1',
    title: 'Veysi Restoran',
    description: 'Kebap & Lahmacun',
    district: 'Maltepe',
    category: 'Restoran',
    start: '09:00',
    end: '17:00',
  },
  {
    id: 'restaurant2',
    title: 'Salih Kafe',
    district: 'Üsküdar',
    category: 'Kafe',
    start: '08:30',
    end: '17:30',
  },
  {
    id: 'restaurant3',
    title: 'Ömer Fırın',
    district: 'Ümraniye',
    category: 'Fırın',
    start: '09:30',
    end: '17:00',
  },
  {
    id: 'restaurant4',
    title: 'Furkan Pastane',
    district: 'Ataşehir',
    category: 'Pastane',
    start: '10:00',
    end: '22:00',
  },
];

const DUMMY_PRODUCTS = [
  {
    restaurantId: 'restaurant1',
    id: 'product1',
    price: 10,
    title: 'Lahmacun',
    description: 'First Product Description',
    start: '19:00',
    end: '22:00',
    amount: 10,
  },
  {
    restaurantId: 'restaurant1',
    id: 'product2',
    price: 16,
    title: 'Kebap',
    description: 'Second Product Description',
    start: '20:00',
    end: '22:00',
    amount: 9,
  },
  {
    restaurantId: 'restaurant2',
    id: 'product1',
    price: 10,
    title: 'Salih Product',
    description: 'First Product Description',
    start: '19:00',
    end: '20:00',
    amount: 8,
  },
  {
    restaurantId: 'restaurant2',
    id: 'product2',
    price: 16,
    title: 'Salih Product2',
    description: 'Second Product Description',
    start: '21:00',
    end: '23:00',
    amount: 7,
  },
  {
    restaurantId: 'restaurant3',
    id: 'product1',
    price: 10,
    title: 'ömer Product',
    description: 'First Product Description',
    start: '22:00',
    end: '23:00',
    amount: 6,
  },
  {
    restaurantId: 'restaurant3',
    id: 'product2',
    price: 16,
    title: 'ömer Product2',
    description: 'Second Product Description',
    start: '18:00',
    end: '19:00',
    amount: 5,
  },
];

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    DUMMY_RESTAURANTS.forEach(restaurant => dispatch(adminActions.addRestaurant({
      enteredId: restaurant.id,
      enteredName: restaurant.title,
      enteredDistrict: restaurant.district,
      enteredCategory: restaurant.category,
      startTime: restaurant.start,
      endTime: restaurant.end,
    })));

    DUMMY_PRODUCTS.forEach(product => dispatch(adminActions.addProduct({
      restaurantIdInput: product.restaurantId,
      idInput: product.id,
      nameInput: product.title,
      fee: product.price,
      descriptionInput: product.description,
      timeInput: product.start,
      endTime: product.end,
      amountInput: product.amount,
    })))
  }, [])

  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const isChanged = useSelector(state => state.cart.changed);
  // const isSelected = useSelector(state => state.ui.isSelected);
  const selectedRestaurant = useSelector(state => state.ui.selectedRestaurant);

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

  return (
    <Fragment>
      {notification && notificationVisibility.show === true && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Switch>

        <Route path='/auth'>
          <AuthLayout>
            <Login />
          </AuthLayout>
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
        <Route path='/products/:restaurantId'>
          <ProductLayout>
            {cartIsVisible && <Cart />}
            <Products />
          </ProductLayout>
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
