import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        name: null,
        userId: null,
        authentication: false,
        email: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.userId = action.payload.access_token;
            state.authentication = action.payload.isAuthenticated;
            state.email = action.payload.userName;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = null;
            state.userId = null;
            state.authentication = false;
            state.email = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;