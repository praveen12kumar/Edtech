import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    key:"",
    subscription_id: "",
    isPaymentVerified: false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[],
}

export const getRazorpayId = createAsyncThunk("razorpay/getRazorpayId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load data");
    }
});


export const purchaseCourseBundle = createAsyncThunk("razorpay/purchaseCourseBundle", async () => {
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const verifyUserPayment = createAsyncThunk("razorpay/verifyUserPayment", async () => {
    try {
        const response = await axiosInstance.get("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });

        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


export const getPaymentRecord = createAsyncThunk("razorpay/paymentRecord", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100");

        toast.promise(response, {
            loading: "Wait! getting payment record",
            success:(data)=> data?.data?.message,
            error: "Failed to get payment record"
        })

        return  (await response)?.data;

    } catch (error) {
        toast.error("Operation failed");
    }
});

export const cancelSubscription = createAsyncThunk("razorpay/cancelSubscription", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Wait! canceling subscription",
            success:(data)=> data?.data?.message,
            error: "Failed to cancel subscription"
        })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})



const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers:{},

    extraReducers: (builder) => {
        builder
        .addCase(getRazorpayId.fulfilled,(state, action) => {
            state.key = action?.payload?.key;
        })

        .addCase(purchaseCourseBundle.fulfilled((state, action) => {
            state.subscription_id = action?.payload?.subscription_id;
        }))

        .addCase(verifyUserPayment.fulfilled((state, action) => {  
            toast.success(action?.payload?.message); 
            state.isPaymentVerified = action?.payload?.success;
        }))
        .addCase(verifyUserPayment.rejected((state, action) => {
            toast.error(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        }))

        .addCase(getPaymentRecord.fulfilled((state, action) => {
            state.allPayments = action?.payload?.payments;
            state.finalMonths = action?.payload?.finalMonths;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        }))




    }
});

export default razorpaySlice.reducer;