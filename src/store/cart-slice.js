// Do not perform a side effect inside of redux reducer. And never run any  asynchronous code in the reducer.
import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
        orders: [],
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.discount,
                    quantity: 1,
                    totalPrice: newItem.discount,
                    name: newItem.name,
                    businessId: newItem.businessId,
                    businessName: newItem.businessName,
                    latitude: newItem.latitude,
                    longitude: newItem.longitude,
                }); // push method that is a must not do, but with react toolkit as emphasized before, we dont have 
                // problem because their redux toolkit internally ensures that this will not manipulate
                // the existhing state
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.discount;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true; 
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        takeOrder(state) {
            state.orders = state.items;
        },
        cleanCart(state) {
            state.items = []
            state.totalQuantity = 0
        },

    }
});


export const cartActions = cartSlice.actions;
export default cartSlice;