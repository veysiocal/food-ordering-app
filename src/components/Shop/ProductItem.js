import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const { name, fee, description, id } = props;

  const dispatch = useDispatch();

  const discount = fee - fee * 0.2;

  // const addToCartHandler = () => {
  //   dispatch(cartActions.addItemToCart({
  //     id,
  //     title,
  //     price,
  //   }));
  // };

  return (
    <li className={classes.itemCustom}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.priceCustom}><span>  ${fee}  </span> ${discount}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actionsCustom}>
          <button /*onClick={addToCartHandler}*/ >Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
