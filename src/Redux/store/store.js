import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";



import authSliceReducer from '../Slices/AuthSlice';
import courseSliceReducer from "../Slices/CourseSlice";
import razorpayReducer from "../Slices/RazorpaySlice";

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpayReducer
    },
    devTools: true,
});

export default store;