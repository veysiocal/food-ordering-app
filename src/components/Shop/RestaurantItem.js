import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './RestaurantItem.module.css';
import { uiActions } from '../../store/ui-slice';
import { Link, useHistory } from 'react-router-dom';

const RestaurantItem = (props) => {
  const { title, id, description, district, businessTypeId, start, end } = props;
  

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const history = useHistory();

  const [hours, minutes, seconds] = start.split(':');
  const dd = new Date(0, 0, 0, +hours, +minutes, +seconds);
  const startTime = dd.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'} );

  const [hours2, minutes2, seconds2] = end.split(':');
  const dd2 = new Date(0, 0, 0, +hours2, +minutes2, +seconds2);
  const endTime = dd2.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'} )

  let category = "";
  switch (businessTypeId) {
    case 1:
      category = "Restoran";
      break;
    case 2:
      category = "Pastane";
      break;
    case 3:
      category = "Fırın";
      break;
    case 4:
      category = "Kafe";
      break;
    case 5:
      category = "Manav";
      break;
    default: category = "Restoran";
  }


  const favoriteHandler = () => {
    if (isLoggedIn) {
      dispatch(uiActions.addToFavorite({
        id,
        title,
        description,
        district,
        category,
        startTime,
        endTime,
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
          <p> <i class="fas fa-clock"></i> {startTime} - {endTime} </p>
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
              <Link to={`/products?businessId=${props.id}`} >Restorana Git</Link>
            </button>

          </div>
        </div>
      </Card>
    </li>
  );
};

export default RestaurantItem;
