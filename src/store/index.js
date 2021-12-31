import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from './cart-slice';
import adminSlice from "./admin-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer, admin: adminSlice.reducer }
});

export default store;