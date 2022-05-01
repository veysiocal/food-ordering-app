import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const compeletedHandler = () => {
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

    items.forEach(item => (dispatch(adminActions.removeProductsForOrder(item))));

    // sendRequest('http://localhost:8080/api/')
    dispatch(cartActions.takeOrder());
    dispatch(cartActions.cleanCart());
  }

  const closeHandler = () => {
    dispatch(uiActions.toggle());
  }
  return (
    <Card className={classes.cartCustom}>

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
    </Card>
  );
};

export default Cart;
