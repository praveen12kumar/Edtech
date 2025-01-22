import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast  from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

const register = createAsyncThunk('auth/register', async (data) => {
    try {
        const response = await axiosInstance.post("/user/register", data);

        toast.promise(response,{
            loading: "Wait! create your account",
            success:(data)=>{
            return data?.data?.message;
            },
            error: "Failed to create account" 
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state, action) => {})
        .addCase(register.fulfilled, (state, action) => {})
        .addCase(register.rejected, (state, action) => {})
    }
});

//export const {} = authSlice.actions;

export default authSlice.reducer;