import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast  from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) !== undefined ? JSON.parse(localStorage.getItem('data')) : {},
}

export const register = createAsyncThunk('auth/register', async (data) => {
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


export const login = createAsyncThunk("auth/login", async(data)=>{
    try {
        const response =  await axiosInstance.post('user/login', async(data)=>{
            toast.promise(response, {
                loading:"Wait, Authentication in process...",
                success: (data)=>{
                    return data?.data?.message;
                },
                error:"Failed to log in "
            })
        })
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data.message);
    }
});


export const logout = createAsyncThunk("auth/logout", async()=>{
    try {
        const response = await axiosInstance.post("user/logout");
        toast.promise(response,{
            loading:"Wait! logout in process",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to log in"
        })

        return response?.data;

    } catch (error) {
        
    }
})


export const updateProfile = createAsyncThunk("auth/update/Profile", async(data)=>{
    try {
        const response = await axiosInstance.put(`/user/profile/${data[0]}`, data[1]);
        toast.promise(response, {
            loading:"Wait! updating profile",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to update profile"
        })
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const getUserData = createAsyncThunk("auth/getUserData", async()=>{
    try {
        const response = await axiosInstance.get(`/user/me`);
        return response?.data;
    } catch (error) {
        toast.error(error?.message);
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

        .addCase(login.fulfilled, (state, action)=>{
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })


        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })

        .addCase(getUserData.fulfilled, (state, action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});

//export const {} = authSlice.actions;

export default authSlice.reducer;