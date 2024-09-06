import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null, // If you're using tokens
};

export const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            // state.token = action.payload.token; // If you're storing the token
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;