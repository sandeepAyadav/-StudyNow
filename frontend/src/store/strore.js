import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice"
import courseReducer from "../slice/courseSlice"
import lectureReducer from "../slice/lectureSlice"
import paymentReducer from "../slice/paymentSlice"
import reviewReducer from "../slice/reviewSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer,
        lecture:lectureReducer,
        payment: paymentReducer,
        review:reviewReducer
    },
   
});