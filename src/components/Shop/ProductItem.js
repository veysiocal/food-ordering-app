import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { useHistory } from 'react-router-dom';

const ProductItem = (props) => {
  const { name, fee, description, id, start, end, amount } = props;

  const dispatch = useDispatch();

  const discount = fee - fee * 0.2;

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const history = useHistory();

  const addToCartHandler = () => {
    if(isLoggedIn) {dispatch(cartActions.addItemToCart({
      id,
      name,
      discount,
    }));} else {
      history.replace('/auth')
    }
  };

  return (
    <div className={classes.itemCustom}>
      <li>
        <Card className={classes.productItemCard}>
          <header>
            <div className={`${classes.photo} ${classes[name]}`}>
            </div>
          </header>
          <div className={classes.infos}>
            <h3>{name}</h3>
            <span className={classes.amount}>{amount} Adet</span>
            <div className={classes.priceCustom}><span>  ${fee}  </span> ${discount}</div>
          </div>
          <div className={classes.details}>
            <p>{description}</p>
          </div>

          <div className={classes.actionsCustom}>
            <p> <i class="fas fa-clock"></i> {start} - {end} </p>
            {props.display !== 'none' && <button onClick={addToCartHandler} >Sepete Ekle</button>}
          </div>
        </Card>
      </li>
      <div className={`${classes[name]} ${classes.photo} `} >
      </div>
    </div>
  );
};

export default ProductItem;
