import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        notification: null,
        isSelected: false,
        selectedRestaurant: null,
        favoriteRestaurants: [],
        notificationIsVisible: { show: false },
        selectedCategories: [],
    },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },
        toggleNotification(state, action) {
            state.notificationIsVisible = {
                show: action.payload.show,
            };
        },
        selected(state, action) {
            // state.isSelected = true;
            state.selectedRestaurant = {
                id: action.payload.id,
                title: action.payload.title,
            };
        },
        addToFavorite(state, action) {
            const restaurantIsFavorited = state.favoriteRestaurants.find(restaurant => restaurant.id === action.payload.id);
            if (!restaurantIsFavorited) {
                state.favoriteRestaurants.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                });
            }

        },
        removeFromFavorite(state, action) {
            state.favoriteRestaurants = state.favoriteRestaurants.filter(item => item.id !== action.payload.id);
        },
        addToSelectedCategories(state, action) {
            const isExist = state.selectedCategories.find(category => category.id === action.payload.id);

            if (isExist) {
                return;
            } else {
                state.selectedCategories.push({
                    id: action.payload.id,
                    categoryName: action.payload.categoryName,
                });
            }
        },
        cleanSelectedCategories(state) {
            state.selectedCategories = [];
        },
        removeSelectedCategory(state, action) {
            state.selectedCategories = state.selectedCategories.filter(category => category.id !== action.payload)
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;