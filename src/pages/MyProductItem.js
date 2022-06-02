import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from '../components/FormElements/Input';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttp } from '../hooks/use-http';
import { adminActions } from '../store/admin-slice';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './ActiveProductItem.module.css';
import Modal from '../components/UI/Modal';

const ProductItem = (props) => {
    const { title, status, description, productId, } = props;
    const [showActivationProductDetails, setShowActivationProductDetails] = useState(false);
    const [inputState, setInputState] = useState({
        amount: '',
        startTime: '',
        endTime: '',
        price: '',
    });
    const history = useHistory();
    const token = useSelector(state => state.auth.token);

    const [isLoading, haveError, sendRequest, clearError] = useHttp();
    const [statusHandler, setStatusHandler] = useState(status);
    const dispatch = useDispatch();
    // const decrementHandler = () => {
    //     dispatch(adminActions.removeItemFromActiveProducts(id));
    // };

    const inputHandler = event => {
        setInputState({
            ...inputState,
            [event.target.name]: event.target.value,
        })
    };

    const activateProduct = async () => {
        const data = await sendRequest('http://localhost:8080/api/admin/add-product-to-sale', 'POST',
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: ' + token,
            },
            JSON.stringify({
                productId,
                title,
                description,
                price: inputState.price,
                startTime: inputState.startTime,
                endTime: inputState.endTime,
                amount: inputState.amount,
            }),
        );
    }

    const activateProductHandler = () => {
        if (showActivationProductDetails === false) {
            setShowActivationProductDetails(true);
        } else {
            activateProduct();
            setShowActivationProductDetails(false)
        }
    };

    const removeFromSale = async () => {
        const data = await sendRequest('http://localhost:8080/api/admin/remove-product-from-sale/' + productId, 'PUT',
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: ' + token,
            }
        );
        if (data.success === true) {
            console.log("RemoveFromSale is SUCCESS");
        }

    };

    const cancelActivation = () => {
        setShowActivationProductDetails(false);
    };

    return (
        <React.Fragment>
            {haveError && <ErrorModal error={haveError} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <li className={classes.itemCustom}>
                <Card>
                    <header>
                        <h3>{title}</h3>
                        <p>Satış durumu: {statusHandler} </p>
                    </header>
                    <p>{description}</p>
                    {showActivationProductDetails && <Modal header='Satış Durumu' show style={{ width: '40%', height: '50%' }}>
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
                        <button onClick={activateProductHandler} className={classes.update_btn_two}>Onayla</button>
                        <button onClick={cancelActivation} className={classes.cancel_button}>İptal</button>
                    </Modal>}
                    <div className={classes.actionsCustom}>
                        {status === 'satis disi' && <button className={classes.update_btn} onClick={activateProductHandler}>Satışa Sun</button>}
                        {status !== 'satis disi' && <button className={classes.cancel_button} onClick={removeFromSale} >Satıştan Çek</button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default ProductItem;
