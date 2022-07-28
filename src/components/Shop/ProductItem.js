import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { useHistory } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';
import { useEffect } from 'react';

const ProductItem = (props) => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const items = useSelector(state => state.cart.items);

  const history = useHistory();

  // console.log("start: ",start)
  // const [hours, minutes, seconds] = start.split(':');
  // const dd = new Date(0, 0, 0, +hours, +minutes, +seconds);
  // const startTime = dd.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'} );

  // const [hours2, minutes2, seconds2] = end.split(':');
  // const dd2 = new Date(0, 0, 0, +hours2, +minutes2, +seconds2);
  // const endTime = dd.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'} )
  
  const { name, fee, description, id, start, end, amount, businessId, businessName, longitude, latitude } = props;

  const discount = fee - fee * 0.2;

  const addToCartHandler = () => {
    const cleanCart = () => {
      dispatch(cartActions.cleanCart())
      dispatch(uiActions.toggleNotification({
        show: false,
      }));
      dispatch(cartActions.addItemToCart({
        id,
        name,
        discount,
        businessId,
        businessName,
        longitude,
        latitude,
      }));
    };
    const isBusinessExists = items.filter(item => item.businessId === businessId)
    if (isLoggedIn) {
      if (items.length === 0) {
        dispatch(cartActions.addItemToCart({
          id,
          name,
          discount,
          businessId,
          businessName,
          longitude,
          latitude,
        }));
        dispatch(uiActions.showNotification({
          status: 'success',
          title: 'Başarılı!',
          message: 'Sepetinize eklendi!',
        }))
        dispatch(uiActions.toggleNotification({
          show: true,
        }));
      }
      else if (items.length !== 0 && isBusinessExists.length !== 0) {
        {
          dispatch(cartActions.addItemToCart({
            id,
            name,
            discount,
            businessId,
            businessName,
            longitude,
            latitude,
          }));
          dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Başarılı!',
            message: 'Sepetinize eklendi!',
          }))
          dispatch(uiActions.toggleNotification({
            show: true,
          }));
        }
      } else {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Hata!',
          message: 'Sepetinizde başka iş yerine ait ürün bulunmakta! Sepetinizi boşaltıp bu ürünü eklemek ister misiniz?',
          button: <button onClick={cleanCart}>Onayla</button>
        }))
        dispatch(uiActions.toggleNotification({
          show: true,
        }));
      }
    } else {
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
            <span className={classes.amount}>{amount} Birim</span>
            <div className={classes.priceCustom}><span>  ₺{fee}  </span> ₺{discount}</div>
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
