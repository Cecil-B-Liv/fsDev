import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,

};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload));   // Store user data
            console.log('User set:', action.payload);   // For testing
            localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
            console.log('Authentication status set:', state.isAuthenticated);   // For testing
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); // Remove user data
            localStorage.removeItem('isAuthenticated'); // Remove authentication status
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;