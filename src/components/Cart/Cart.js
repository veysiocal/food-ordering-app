import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items);
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
    </Card>
  );
};

export default Cart;
