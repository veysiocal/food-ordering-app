import { useDispatch } from 'react-redux';
import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
import classes from './ActiveProductItem.module.css';

const ProductItem = (props) => {
  const { name, type, date, start, end, fee, amount, description, id, restaurantId } = props;

  const discount = fee - fee * 0.2;

  const dispatch = useDispatch();
  const removeProductHandler = () => {
    dispatch(adminActions.removeProduct(id));
  };

  return (
    <li className={classes.itemCustom}>
      <Card>
        <header>
          {/* <h1>Restoran:{restaurantId}</h1> */}
          <h3>{name}</h3>
          <div className={classes.priceCustom}><span> <small> ${fee}</small>  </span> <strong>${discount}</strong></div>
        </header>
        <p>{description}</p>
        <p>{start} - {end}</p>
        <div className={classes.actionsCustom}>
          <button onClick={removeProductHandler}>Ürünü Kaldır</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
