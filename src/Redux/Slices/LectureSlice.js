import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures:[],
}

export const getCourseLectures = createAsyncThunk('lectures/getCourseLectures', async (cid, { rejectWithValue }) => {
    try {
        const response = axiosInstance.get(`/course/${cid}`);

        toast.promise(response,{
            loading:"Wait! getting course lectures",
            success:"Successfully got course lectures",
            error:"Failed to get course lectures"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        rejectWithValue(error?.response?.data?.message);
    }
})


export const addCourseLecture = createAsyncThunk('lectures/addCourseLecture', async (data, { rejectWithValue }) => {

    const formData = new FormData();

    formData.append("lecture", data.lecture);
    formData.append("title", data.title);
    formData.append("description", data.description);
    
    try {
        const response = axiosInstance.post(`/courses/${data.id}`, formData);

        toast.promise(response, {
            loading:"Wait! adding course lecture",
            success:"Successfully added course lecture",
            error:"Failed to add course lecture"
        })

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        rejectWithValue(error?.response?.data?.message);
    }
})


export const deleteCourseLecture = createAsyncThunk('lectures/deleteCourseLecture', async (data, { rejectWithValue }) => {
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading:"Wait! deleting course lecture",
            success:"Successfully deleted course lecture",
            error:"Failed to delete course lecture"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        rejectWithValue(error?.response?.data?.message);
    }
})

const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getCourseLectures.fulfilled, (state, action) => {
            state.lectures = action?.payload?.lectures;
        })

        .addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer;