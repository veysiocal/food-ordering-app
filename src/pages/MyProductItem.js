import { useDispatch } from 'react-redux';
import Card from '../components/UI/Card';
import { adminActions } from '../store/admin-slice';
import classes from './ActiveProductItem.module.css';

const ProductItem = (props) => {
    const { name, start, end, fee, amount, description, id, } = props;

    const discount = fee - fee * 0.2;

    const dispatch = useDispatch();
    const decrementHandler = () => {
        dispatch(adminActions.removeItemFromActiveProducts(id));
    };

    return (
        <li className={classes.itemCustom}>
            <Card>
                <header>
                    <h3>{name}</h3>
                    <div className={classes.priceCustom}><span> <small> ${fee}</small>  </span> <strong>${discount}</strong></div>
                </header>
                <p>{description}</p>
                <p>{start} - {end}</p>
                <p>{amount} Adet</p>
                <div className={classes.actionsCustom}>
                    <button onClick={decrementHandler}>Eksilt</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
