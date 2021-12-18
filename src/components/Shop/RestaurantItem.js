import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './RestaurantItem.module.css';
import { uiActions } from '../../store/ui-slice';
import { Link } from 'react-router-dom';

const RestaurantItem = (props) => {
  const { title, id, description, district } = props;

  const dispatch = useDispatch();

  const favoriteHandler = () => {
    dispatch(uiActions.addToFavorite({
      id,
      title,
      description,
    }));

    dispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success!',
      message: 'Successfully Added!',
    }));

    dispatch(uiActions.toggleNotification({
      show: true,
    }));
  };

  const cancelFavoriteHandler = () => {
    dispatch(uiActions.removeFromFavorite({
      id,
      title,
      description,
    }));

  };

  return (
    <li className={classes.itemCustom}>
      <Card>
        <header>
          <h3>{title}</h3>
        </header>
        <p>{description}</p>
        <p>{district}</p>
        <div className={classes.actionsCustom}>
          {props.favorited === false && <button onClick={favoriteHandler}>
            Add to Favorite
          </button>}
          {props.favorited === true && <button onClick={cancelFavoriteHandler}>
            Remove from favorites
          </button>}
          <Link className='btnCustom' to={`/products/${props.id}`} >Select Restaurant</Link>
        </div>
      </Card>
    </li>
  );
};

export default RestaurantItem;
