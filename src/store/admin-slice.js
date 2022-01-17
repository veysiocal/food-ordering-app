import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        restaurants: [],
        activeProducts: [],
        restaurantExist: false,
        activeProductsRestaurantId: null,
    },
    reducers: {
        addRestaurant(state, action) {
            const checkRestaurant = state.restaurants.find(restaurant => restaurant.id === action.payload.enteredId);
            if (checkRestaurant) {
                state.restaurantExist = true;
            } else {
                state.restaurantExist = false;

                state.restaurants.push({
                    id: action.payload.enteredId,
                    title: action.payload.enteredName,
                    phone: action.payload.enteredPhone,
                    email: action.payload.enteredEmail,
                    address: action.payload.enteredAddress,
                    description: action.payload.enteredDescription,
                    category: action.payload.enteredCategory,
                    district: action.payload.enteredDistrict,
                    start: action.payload.startTime,
                    end: action.payload.endTime,
                })
            }

        },
        addProduct(state, action) {
            state.activeProducts.push({
                restaurantId: action.payload.restaurantIdInput,
                id: action.payload.idInput,
                name: action.payload.nameInput,
                type: action.payload.typeInput,
                date: action.payload.dateInput,
                start: action.payload.timeInput,
                end: action.payload.endTime,
                price: action.payload.fee,
                amount: action.payload.amountInput,
                description: action.payload.descriptionInput,
            })
        },
        removeItemFromActiveProducts(state, action) {
            const id = action.payload;
            const existingItem = state.activeProducts.find(item => item.id === id);
            if (existingItem.amount === 1) {
                state.activeProducts = state.activeProducts.filter(item => item.id !== id);
            } else {
                existingItem.amount--;
            }
        },
        removeProductsForOrder(state, action) {
            const id = action.payload.id;
            const quantity = +action.payload.quantity

            const existingItem = state.activeProducts.find(item => item.id === id);
            if (existingItem.amount === 1) {
                state.activeProducts = state.activeProducts.filter(item => item.id !== id);
            } else {
                existingItem.amount = existingItem.amount - quantity
            }
        },
        activeProductsSelection(state, action) {
            state.activeProductsRestaurantId = action.payload
        }
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;