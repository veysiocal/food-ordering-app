import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        name: null,
        token: null,
        authentication: false,
        email: null,
        userType: null,
        businessId: null,
        tokenExpirationDate: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = !!action.payload.access_token;
            state.name = action.payload.name;
            state.token = action.payload.access_token;
            state.authentication = action.payload.isAuthenticated;
            state.email = action.payload.userName;
            state.userType = action.payload.userType;
            state.businessId = action.payload.businessId;
            state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 30);
            localStorage.setItem("tokenData", action.payload.access_token);

        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = null;
            state.token = null;
            state.userId = null;
            state.authentication = false;
            state.email = null;
            state.userType = null;
            state.businessId = null;
            localStorage.removeItem("tokenData");
        },
        loadUser(state, action) {
            state.isLoggedIn = !!action.payload.access_token;
            state.name = action.payload.name;
            state.token = action.payload.access_token;
            state.authentication = action.payload.isAuthenticated;
            state.email = action.payload.userName;
            state.userType = action.payload.userType;
            state.businessId = action.payload.businessId;
            state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 30);
        }
    },
});

export const authActions = authSlice.actions;
export default authSlice;