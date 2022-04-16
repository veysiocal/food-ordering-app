import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        name: "",
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;