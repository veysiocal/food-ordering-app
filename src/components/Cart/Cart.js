import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import { adminActions } from '../../store/admin-slice';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const [orderIsSuccess, setOrderIsSuccess] = useState(false);
  const [isLoading, haveError, sendRequest] = useHttp();

  let items = useSelector(state => state.cart.items);

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

    console.log("orderlines: ",orderLines);

    const reqbody = {
      orderLines,
      totalPrice,
      businessOwnerId,
      status: 'aktif'
    };

    console.log("rew.body: ",reqbody);
    
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
          title: 'Success!',
          message: 'Successfully Added! Please go to the restaurant!',
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
  }

  const closeHandler = () => {
    dispatch(uiActions.toggle());
  }

  if(haveError) {
    console.log("errorÇ: ",haveError)
  }
  return (
    <>

      {items.length !== 0 && <ul>
        {items.map(
          item => (<CartItem
            key={item.id}
            item={{ id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />
          ))}
        <button onClick={compeletedHandler}>Öde ve Ürünleri Ayırt</button>

      </ul>}
      {items.length === 0 && <div><p>Sepetinde ürün bulunmamaktadır...</p></div>}
      <button onClick={closeHandler} className={classes.closeButton}>Kapat</button>
    </>
  );
};

export default Cart;
