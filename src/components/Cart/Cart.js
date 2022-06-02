import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import { adminActions } from '../../store/admin-slice';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from '../UI/LoadingSpinner';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const [orderIsSuccess, setOrderIsSuccess] = useState(false);
  const [isLoading, haveError, sendRequest, clearError] = useHttp();

  let items = useSelector(state => state.cart.items);
console.log("items: ",items)
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = useSelector(state => state.auth.token);

  const compeletedHandler = async () => {

    console.log("items: ", items)

    // items.forEach(item => (dispatch(adminActions.removeProductsForOrder(item))));
    const orderLines = items.map(item => ({
      'productId': item.id,
      'quantity': item.quantity,
      'price': item.price,
      'productName': item.name,
    }))

    let totalPrice = 0;
    items.map(item => {
      totalPrice = totalPrice + item.totalPrice;
    });

    const businessOwnerId = queryParams.get('businessId');

    console.log("orderlines: ", orderLines);

    const reqbody = {
      orderLines,
      totalPrice,
      businessOwnerId,
      status: 'aktif'
    };

    console.log("rew.body: ", reqbody);

    try {
      const data = await sendRequest('http://localhost:8080/api/orders/member/create-order', 'POST',
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + token
        },
        JSON.stringify(reqbody));

      if (data.success === true) {
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Başarılı!',
          message: 'Siparişiniz alındı. Lütfen restorana gidiniz!',
          maps: true,
          coordinates: {
            longitude: items[0].longitude,
            latitude: items[0].latitude,
          },
        }));

        dispatch(uiActions.toggleNotification({
          show: true,
        }));

        dispatch(uiActions.activateOrderPage({
          show: true,
        }))
      }
    } catch {

    }

    // dispatch(cartActions.takeOrder());
    dispatch(cartActions.cleanCart());
    dispatch(uiActions.toggle());
  }

  const closeHandler = () => {
    dispatch(uiActions.toggle());
  }


  return (
    <React.Fragment>
      {haveError && <ErrorModal error={haveError} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      {haveError && <ErrorModal error={haveError} onClear={clearError} />}
      <Modal header={`Sepetim - ${items.length !== 0 ? items[0].businessName : ''}`} show onCancel={closeHandler}>
        {items.length !== 0 && <ul>
          {items.map(
            item => (<CartItem
              key={item.id}
              item={{ id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
            />
            ))}
        </ul>}
        {items.length === 0 && <div><p>Sepetinde ürün bulunmamaktadır...</p></div>}
        <footer className={classes.cart__footer}>
          {items.length !== 0 && <button onClick={compeletedHandler}>Öde ve Ürünleri Ayırt</button>}
          <button onClick={closeHandler} className={classes.closeButton}>Kapat</button>
        </footer>
      </Modal>
    </React.Fragment>
  );
};

export default Cart;
