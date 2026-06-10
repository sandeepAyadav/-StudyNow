import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Signup failed"
            );
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, userData, { withCredentials: true });
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const forgotPasswordAction = createAsyncThunk(
    "auth/forgotPasswordAction",
    async (emailData, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, emailData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to send OTP");
        }
    }
);


export const resetPasswordAction = createAsyncThunk(
    "auth/resetPasswordAction",
    async (resetData, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, resetData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Password reset failed");
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        error: null,
        success: false,
    },
    
    reducers: {
       
        logoutUser: (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
            state.success = false;
           
        },
       
        clearAuthState: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })

           
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user; 
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            
.addCase(forgotPasswordAction.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.success = false;
})
.addCase(forgotPasswordAction.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
})
.addCase(forgotPasswordAction.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
})
.addCase(resetPasswordAction.pending, (state) => {
    state.loading = true;
    state.error = null;
    state.success = false;
})
.addCase(resetPasswordAction.fulfilled, (state) => {
    state.loading = false;
    state.success = true;
})
.addCase(resetPasswordAction.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
});
    },
});


export const { logoutUser, clearAuthState } = authSlice.actions;

export default authSlice.reducer;