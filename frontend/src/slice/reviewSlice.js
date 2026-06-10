import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/review`; 

const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        withCredentials: true
    };
};


export const fetchReviewsByCourse = createAsyncThunk(
    "review/fetchReviewsByCourse",
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/all/${courseId}`, getAuthConfig());
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
        }
    }
);


export const postCourseReview = createAsyncThunk(
    "review/postCourseReview",
    async ({ courseId, star, comment }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/add/${courseId}`, { star, comment }, getAuthConfig());
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to submit review");
        }
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        loading: false,
        reviews: [],
        reviewCount: 0,
        submitting: false,
        success: false,
        error: null,
    },
    reducers: {
        resetReviewState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Reviews
            .addCase(fetchReviewsByCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewsByCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.allreview;
                state.reviewCount = action.payload.count;
            })
            .addCase(fetchReviewsByCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Post Review
            .addCase(postCourseReview.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = false;
            })
            .addCase(postCourseReview.fulfilled, (state, action) => {
                state.submitting = false;
                state.success = true;
                state.reviews.unshift(action.payload.review); 
                state.reviewCount += 1;
            })
            .addCase(postCourseReview.rejected, (state, action) => {
                state.submitting = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;