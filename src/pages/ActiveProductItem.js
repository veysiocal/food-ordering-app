import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import { adminActions } from '../store/admin-slice';
import classes from './ActiveProductItem.module.css';

const ProductItem = (props) => {
  const { product } = props;
  const [productItem, setProductItem] = useState(product);

  const [inputState, setInputState] = useState({
  })


  const [isLoading, haveError, sendRequest] = useHttp();
  const [showUpdateFields, setShowUpdateFields] = useState(false);

  const token = useSelector(state => state.auth.token);

  const discount = product.price - product.price * 0.2;

  const inputHandler = event => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    })
  };

  const updateProductHandler = async() => {
    setShowUpdateFields(false);
    const data = await sendRequest('http://localhost:8080/api/admin/update-active-product/' + product.productId, 'PUT',
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: ' + token,
      },
      JSON.stringify(inputState),
    );
    if (data.success === true) {
      console.log("başarılı")
      console.log("da: ",data.data)
      setProductItem(data.data);
    }
  };

  const updateActiveProductHandler = () => {
    if (showUpdateFields === false) {
      setShowUpdateFields(true);
    } else {

      updateProductHandler();
    }
  }

  const cancelActivation = () => {
    setShowUpdateFields(false);
  }

  if (isLoading) {
    <LoadingSpinner asOverlay />
  }

  if (haveError) {
    return (
      <h2>Error: {haveError} </h2>
    );
  }

  return (
    <li className={classes.itemCustom}>
      <Card>
        <header>
          {/* <h1>Restoran:{restaurantId}</h1> */}
          <h3>{productItem.title}</h3>
          <div className={classes.priceCustom}><span> <small> ${productItem.price}</small>  </span> <strong>${discount}</strong></div>
        </header>
        <p>{product.description}</p>
        <p>{product.startTime} - {product.endTime}</p>
        <p>{product.amount} Adet</p>
        {showUpdateFields && <div className={classes.details}>
          <label>Miktar: </label>
          <input onChange={inputHandler} value={inputState.amount} name='amount'></input> <br />
          <label>Start Time: </label>
          <input onChange={inputHandler} value={inputState.startTime} name='startTime'></input> <br />
          <label>End Time: </label>
          <input onChange={inputHandler} value={inputState.endTime} name='endTime'></input> <br />
          <label>Fiyat: </label>
          <input onChange={inputHandler} value={inputState.price} name='price'></input> <br />
          <button onClick={updateProductHandler}>Güncelle</button>
          <button onClick={cancelActivation}>İptal</button>
        </div>}
        <div className={classes.actionsCustom}>
          <button onClick={updateActiveProductHandler}>Güncelle</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
