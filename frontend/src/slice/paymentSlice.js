import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true
    };
};


export const initiatePayment = createAsyncThunk(
    "payment/initiatePayment",
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/order/${courseId}`, {}, getAuthConfig());
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Order creation failed");
        }
    }
);


export const verifyPayment = createAsyncThunk(
    "payment/verifyPayment",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, paymentData, getAuthConfig());
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Payment verification failed");
        }
    }
);


const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        orderData: null,
        paymentSuccess: false,
        error: null,
    },
    reducers: {
        resetPaymentState: (state) => {
            state.loading = false;
            state.orderData = null;
            state.paymentSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initiatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.orderData = action.payload.order;
            })
            .addCase(initiatePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state) => {
                state.loading = false;
                state.paymentSuccess = true;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.paymentSuccess = false;
                state.error = action.payload;
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;