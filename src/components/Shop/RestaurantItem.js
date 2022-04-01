import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './RestaurantItem.module.css';
import { uiActions } from '../../store/ui-slice';
import { Link, useHistory } from 'react-router-dom';

const RestaurantItem = (props) => {
  const { title, id, description, district, category, start, end} = props;

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  const history = useHistory();

  const favoriteHandler = () => {
    if(isLoggedIn) {
      dispatch(uiActions.addToFavorite({
        id,
        title,
        description,
        district,
        category,
        start,
        end,
      }));

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Successfully Added!',
      }));
  
      dispatch(uiActions.toggleNotification({
        show: true,
      }));
    } else {
      history.replace('/auth')
    }


  };

  const cancelFavoriteHandler = () => {
    dispatch(uiActions.removeFromFavorite({
      id,
    }));

  };

  return (
    <li>
      <Card className={classes.itemCustom}>
        <div className={classes.headerPart}>
          <header>
            <h3>{title}</h3>
          </header>
          <p>{category}</p>
          <p>{district}</p>
          <p> <i class="fas fa-clock"></i> {start} - {end} </p>
        </div>
        <div className={`${classes.otherPart} ${classes[category]}`}>
          <div className={classes.actionsCustom}>
            {props.favorited === false && <button onClick={favoriteHandler}>
              Favorilere Ekle
            </button>}
            {props.favorited === true && <button onClick={cancelFavoriteHandler}>
              Favorilerden Çıkar
            </button>}
            <button>
              <Link to={`/products/${props.id}`} >Restorana Git</Link>
            </button>

          </div>
        </div>
      </Card>
    </li>
  );
};

export default RestaurantItem;
