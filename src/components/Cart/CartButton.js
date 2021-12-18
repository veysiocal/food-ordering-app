import { useDispatch , useSelector} from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const quantity =  useSelector(state => state.cart.totalQuantity)
  const cartButtonHandler = () => {
    dispatch(uiActions.toggle());
  };
  
  return (
    <button 
    className={classes.buttonCustom}
     onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span 
      className={classes.badgeCustom}
      >{quantity}</span>
    </button>
  );
};

export default CartButton;
