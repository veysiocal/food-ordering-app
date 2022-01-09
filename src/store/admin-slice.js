import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        restaurants: [],
        activeProducts: [],
        restaurantExist: false,
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
                    enteredPhone: action.payload.enteredPhone,
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
        removeProduct(state, action) {
            state.activeProducts = state.activeProducts.filter(product => product.id !== action.payload)
        },
    }
});

export const adminActions = adminSlice.actions;
export default adminSlice;