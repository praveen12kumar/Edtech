import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
    courseData: []
};

export const getAllCourses = createAsyncThunk('course/getAllCourses', async (_, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get("/course");
        toast.promise(response, {
            loading: "Wait! getting all courses",
            success: "Successfully got all the courses",
            error: "Failed to get all the courses"
        })

        return (await response).data.courses;

    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        rejectWithValue(error?.response?.data?.message);
    }
})

const courseSlice = createSlice({   
    name: "courses",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase("getCourses.fulfilled", (state, action) => {
            state.courseData = [...action.payload];
        });
    }
})


export default courseSlice.reducer;