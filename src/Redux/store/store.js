import { configureStore} from "@reduxjs/toolkit";



import authSliceReducer from '../Slices/AuthSlice';
import courseSliceReducer from "../Slices/CourseSlice";
import razorpayReducer from "../Slices/RazorpaySlice";
import lectureReducer from "../Slices/LectureSlice";

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpayReducer,
        lecture: lectureReducer
    },
    devTools: true,
});

export default store;