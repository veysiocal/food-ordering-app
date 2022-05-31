import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import CartIcon from '../../components/Cart/CartIcon';

import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const quantity = useSelector(state => state.cart.totalQuantity)
  const cartButtonHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button
      className={classes.buttonCustom}
      onClick={cartButtonHandler}>
      <div className={classes.icon}>
        <CartIcon />
      </div>
      <span
        className={classes.badgeCustom}
      >{quantity}</span>
    </button>
  );
};

export default CartButton;
