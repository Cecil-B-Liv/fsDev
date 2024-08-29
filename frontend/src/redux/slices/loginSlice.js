import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for login and signup
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', credentials);
            return response.data; // Assume the response contains user data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/signup', newUser);
            return response.data; // Assume the response contains user data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Initial state
const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

// The slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
