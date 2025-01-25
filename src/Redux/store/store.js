import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


import authSliceReducer from '../Slices/AuthSlice';
import courseSliceReducer from "../Slices/CourseSlice";


const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer
    },
    devTools: true,
});

export default store;