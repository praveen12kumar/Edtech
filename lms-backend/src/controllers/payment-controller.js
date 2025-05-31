import { PaymentService } from "../services/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";


const paymentService = new PaymentService();

export const getRazorpayApiKey = async(req, res, next) => {
        const response = await paymentService.getRazorpayApiKey();

        res.status(200).json({
            success: true,
            key: response,
            message: "Razorpay API Key fetched successfully",
            err: {}
        })
}


export const buyCourse = async(req, res, next) =>{
    
    const {_id} = req.user;
    const {courseId} = req.body;
    
    if(!courseId){
        return next(new ErrorHandler("Course is required", 403));
    }

    const response = await paymentService.buyCourse(_id, courseId);
    
    
    res.status(200).json({
        success: true,
        data: response,
        message: "Course order created successfully",
        err: {}
    });
}


export const verifyCourse = async(req, res, next)=>{
    
    const {_id} = req.user;
    const {razorpay_payment_id, razorpay_order_id,  razorpay_signature} = req.body;

    //console.log("razorpay_payment_id", razorpay_payment_id, "subscriptionId", razorpay_order_id, "razorpay_signature", razorpay_signature);

    if(!razorpay_payment_id  || !razorpay_signature || !razorpay_order_id){
        return next(new ErrorHandler("All fields are required", 403));
    }

    const response = await paymentService.verifyCourse(_id, razorpay_payment_id, razorpay_order_id, razorpay_signature);
    res.status(200).json({
        success: true,
        data: response,
        message: "Course verified successfully",
        err: {}
    });
}



