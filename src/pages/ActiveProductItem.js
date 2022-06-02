import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import { adminActions } from '../store/admin-slice';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './ActiveProductItem.module.css';
import Modal from '../components/UI/Modal';

const ProductItem = (props) => {
  const { product } = props;
  const [productItem, setProductItem] = useState(product);

  const [inputState, setInputState] = useState({
  })


  const [isLoading, haveError, sendRequest, clearError] = useHttp();
  const [showUpdateFields, setShowUpdateFields] = useState(false);

  const token = useSelector(state => state.auth.token);

  const discount = product.price - product.price * 0.2;

  const inputHandler = event => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    })
  };

  const updateProductHandler = async () => {
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
      console.log("da: ", data.data)
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

  return (
    <React.Fragment>
      {haveError && <ErrorModal error={haveError} onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
      <li className={classes.itemCustom}>
        <Card>
          <header className={classes.header}>
            {/* <h1>Restoran:{restaurantId}</h1> */}
            <h3>{productItem.title}</h3>
            <div className={classes.priceCustom}><span> <small> ${productItem.price}</small>  </span> <strong>${discount}</strong></div>
          </header>
          <p>{product.description}</p>
          <p>{product.startTime} - {product.endTime}</p>
          <p>{product.amount} Adet</p>
          {showUpdateFields && 
            <Modal header='Güncelle' show style={{width:'40%', height: '50%'}}>
              <div className={classes.details_div}>
                <label>Miktar: </label>
                <input onChange={inputHandler} value={inputState.amount} name='amount'></input>
              </div>
              <div className={classes.details_div}>

                <label>Start Time: </label>
                <input onChange={inputHandler} value={inputState.startTime} name='startTime'></input>
              </div>
              <div className={classes.details_div}>

                <label>End Time: </label>
                <input onChange={inputHandler} value={inputState.endTime} name='endTime'></input>
              </div>
              <div className={classes.details_div}>

                <label>Fiyat: </label>
                <input onChange={inputHandler} value={inputState.price} name='price'></input>
              </div>
              <button onClick={updateProductHandler} className={classes.update_btn_two}>Güncelle</button>
              <button onClick={cancelActivation} className={classes.cancel_button}>İptal</button>
            </Modal>
}
          <div className={classes.actionsCustom}>
            <button onClick={updateActiveProductHandler} className={classes.update_btn}>Güncelle</button>
          </div>
        </Card>

      </li>
    </React.Fragment>
  );
};

export default ProductItem;
