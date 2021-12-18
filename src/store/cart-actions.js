import { uiActions } from "./ui-slice";
import { cartActions } from './cart-slice';

export const sendDataToFirebase = (cart) => {
    return async (dispatch) => {
        // before we call dispatch, we can perform any asynchronous code, any side effects, because we will not
        // have reached our reducer. We are not running this code in a reducer. It is a separate JS function instead.
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        })); // actual action we wanna perform.
        dispatch(uiActions.toggleNotification({
            show: true,
        }));
        const sendRequest = async () => {
            const response = await fetch('https://redux-b2104-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity }),
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        } // we use try catch after, so we put fetch a separete function.

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sent cart data failed!',
                })
            );
        }

        dispatch(uiActions.toggleNotification({
            show: true,
        }));
    };

}

export const fetchCartData = () => {
    return async(dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://redux-b2104-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }

            const data = response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch( cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};
