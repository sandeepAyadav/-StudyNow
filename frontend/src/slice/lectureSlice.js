import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addlecture = createAsyncThunk(
    "lecture/addlecture",
    async({courseId,addlectureForm}, thunkAPI)=>{
        try{
            const token = localStorage.getItem("token");
            if(!token || token == "undefined"){
                return thunkAPI.rejectWithValue("please login first");
            }
           const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/createlecture/${courseId}`,addlectureForm,{
headers:{
    Authorization:`Bearer ${token}`,
    "content-type":"multipart/form-data"
},withCredentials:true
           });
           return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "add lecture failed"
            )

        }
    }
)
export const singleCourse = createAsyncThunk(
    "lecture/singleCourse",
    async(courseId,thunkAPI)=>{
        try{
 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/singlecourse/${courseId}`,{withCredentials:true});
          return response.data;

        }catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||"not get course"
            );
        }
    }
)
const lectureSlice=createSlice(
    {
     name:"lecture",
     initialState:{
        loading :false,
        success:false,
        error:null,
        singleData:[]
    },
    reducers:{
        resetLectureState:(state)=>{
            state.success = false;
            state.error = null;
        }
    },
    extraReducers :(builder)=>{
        builder
        .addCase(addlecture.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        .addCase(addlecture.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.success = true;
    })
    .addCase(addlecture.rejected,(state,action)=>{
        state.loading = false;
        state.success = false;
        state.error = action.payload
    })
     .addCase(singleCourse.pending,(state)=>{
           state.loading = true;
           state.error = null;
            })
            .addCase(singleCourse.fulfilled,(state,action)=>{
                state.loading = false;
                state.singleData = action.payload.lecture;
            })
            .addCase(singleCourse.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }

    }
)

export const {resetLectureState} = lectureSlice.actions;
export default lectureSlice.reducer;