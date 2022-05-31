import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(cartActions.addItemToCart({
      id,
      discount: price
    }))
  }

  const decrementHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }
  return (
    <li className={classes.itemCustom} >
      <header>
        <h3>{title}</h3>
        <div className={classes.priceCustom} >
          {/* ${total.toFixed(2)}{' '} */}
          ₺{total}{' '}

          {/* <span className={classes.itempriceCustom}>(${price.toFixed(2)}/item)</span> */}
          <span className={classes.itempriceCustom}>(₺{price}/item)</span>

        </div>
      </header>
      <div
        className={classes.detailsCustom}
      >
        <div className={classes.quantityCustom} >
          x <span>{quantity}</span>
        </div>
        <div className={classes.actionsCustom}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
