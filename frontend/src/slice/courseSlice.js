import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCourse = createAsyncThunk(
    "course/createCourse",
    async(formData,thunkAPI)=>{
        try{
            const token = localStorage.getItem("token");
            if (!token || token === "undefined") {
                return thunkAPI.rejectWithValue("You are not logged in! Please login again.");
            }
const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/course`,formData,
    {headers:{
        Authorization: `Bearer ${token}`,
        "content-type":"multipart/form-data"
    },withCredentials:true});
          return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Course Creation Failed"
            );

        }

    }
);

export const fetchAllCourses = createAsyncThunk(
    "course/fetchAllCourses",
    async (params = {}, thunkAPI) => { 
        try {
           
            const search = params.search || "";
            const page = params.page || 1;
            const limit = params.limit || 6;

            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/all-courses?search=${search}&page=${page}&limit=${limit}`
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load catalog");
        }
    }
);

const courseSlice = createSlice({
    name:"course",
    initialState:{
        loading:false,
        course:null,
        error:null,
        success:false,
        allCourses:[],
        searchQuery: "",
        totalPages: 1,
        currentPage: 1,
        totalCourses: 0
       
    },
    reducers: {
   
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
    extraReducers:(builder)=>{
        builder
        .addCase(createCourse.pending,(state)=>{
            state.loading =true;
            state.error = null
        })
        .addCase(createCourse.fulfilled,(state,action)=>{
            state.loading = false;
            state.success=true;
            state.course=action.payload;

        })
        .addCase(createCourse.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload;

        })
        .addCase(fetchAllCourses.pending,(state)=>{
            state.loading=true;
            state.error = null;
        })
        .addCase(fetchAllCourses.fulfilled, (state, action) => {
    state.loading = false;
    
    state.allCourses = action.payload.allCourses || []; 
    state.totalPages = action.payload.totalPages || 1;
          state.currentPage = action.payload.currentPage || 1;
          state.totalCourses = action.payload.totalCourses || 0;
          state.error = null;
    state.error = null;
})
        .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; 
            });
           
    },
});
export const { setSearchQuery } = courseSlice.actions;
export default courseSlice.reducer;