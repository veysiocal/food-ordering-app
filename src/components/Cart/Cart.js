import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items);

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
  }
  return (
    <Card className={classes.cartCustom}>

      <ul>
        {items.map(
          item => (<CartItem
            key={item.id}
            item={{ id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />
          ))}
      </ul>
      <button onClick={compeletedHandler}>Öde ve Ürünleri Ayırt</button>
    </Card>
  );
};

export default Cart;
