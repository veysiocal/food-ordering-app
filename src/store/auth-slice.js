import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        name: null,
        token: null,
        authentication: false,
        email: null,
        tokenExpirationDate: null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = !!action.payload.access_token;
            state.name = action.payload.name;
            state.token = action.payload.access_token;
            state.authentication = action.payload.isAuthenticated;
            state.email = action.payload.userName;
            state.tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 3);
            localStorage.setItem("tokenData", JSON.stringify({
                token: action.payload.access_token,
                expiration: state.tokenExpirationDate.toISOString(),
            })
            );

        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = null;
            state.userId = null;
            state.authentication = false;
            state.email = null;
            localStorage.removeItem("tokenData");
        },
        loadUser(state, action) {
            state.isLoggedIn = !!action.payload.access_token;
            state.name = action.payload.name;
            state.token = action.payload.access_token;
            state.authentication = action.payload.isAuthenticated;
            state.email = action.payload.userName;
        }
    },
});

export const authActions = authSlice.actions;
export default authSlice;