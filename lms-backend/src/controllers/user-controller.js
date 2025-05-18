import { UserService } from "../services/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

const userservice = new UserService();

/**
 * @desc    Get current user's profile
 * @route   GET /api/v1/user/profile
 * @access  Private
 */


export const getProfile = catchAsyncError(async (req, res) => {
    const response = await userservice.getProfile(req.user._id);

    res.status(200).json({
        success: true,
        data: response,
        message: "User profile fetched successfully",
        err: {}
    });
});


/**
 * @desc    Change current user's password
 * @route   PUT /api/v1/user/change-password
 * @access  Private
 */

export const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("All fields are required", 400));
    }

    const response = await userservice.changeUserPassword(req.user._id, oldPassword, newPassword);

    res.status(200).json({
        success: true,
        data: response,
        message: "Password changed successfully",
        err: {}
    });
});



/**
 * @desc    Send reset password OTP to user's email
 * @route   POST /api/v1/user/forgot-password
 * @access  Public
 */

export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    if(!email){
        return next(new ErrorHandler("Email is required", 400));
    }

    const response = await userservice.forgotUserPassword(email);
    
    res.status(200).json({
        success: true,
        data: response,
        message: "Password reset email sent successfully",
        err: {}
    });
});




/**
 * @desc    Reset user password using OTP
 * @route   POST /api/v1/user/reset-password
 * @access  Public
 */

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    // Input validation before proceeding
    if (!email || !otp || !newPassword) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const response = await userservice.resetUserPassword(email, otp, newPassword);

    res.status(200).json({
        success: true,
        data: response,
        message: "Password reset successfully",
        err: {}
    });
});

