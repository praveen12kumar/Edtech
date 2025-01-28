import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    allUsersCount : 0,
    subscribedCount:0,
}

export const getStatsData = createAsyncThunk('stats/getStatsData', async (_, { rejectWithValue }) => {
    const response = axiosInstance.get("/admin/stats/users");
    toast.promise(response, {
        loading:"Wait! getting stats",
        success:(data) => data?.data?.message,
        error:"Failed to get stats"
    })

    return (await response).data;
})

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getStatsData.fulfilled, (state, action) => {
            state.allUsersCount = action?.payload?.allUsersCount;
            state.subscribedCount = action?.payload?.subscribedCount;
        })
    }
})


export default statSlice.reducer;