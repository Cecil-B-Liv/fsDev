import { configureStore } from '@reduxjs/toolkit';

import authReducer from './feature/authSlice';
// ... import other reducers as you create them

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // ... other reducers
    },
});