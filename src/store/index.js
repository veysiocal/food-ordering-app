import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from './cart-slice';
import adminSlice from "./admin-slice";
import authSlice from './auth-slice'
const store = configureStore({
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer, admin: adminSlice.reducer, auth: authSlice.reducer }
});

export default store;