import { UserService } from "../services/index.js";

const userservice = new UserService();


export const getProfile = async(req, res) => {
  
    try {
        const response = await userservice.getProfile(req.user._id);
        res.status(200).json({
            success: true,
            data: response,
            message: "User profile fetched successfully",
            err: {} 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}


export const changePassword = async(req, res)=>{
    try {
        const {oldPassword, newPassword} = req.body;
        // console.log("newPassword", newPassword);
        const response = await userservice.changeUserPassword(req.user._id, oldPassword, newPassword);
        //console.log("response", response);
        res.status(200).json({
            success: true,
            data: response,
            message: "Password changed successfully",
            err: {}
        })
    } catch (error) {
        if(error.message === "User not found"){
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error.message
            })
        }
        if(error.message === "Invalid password"){
            res.status(401).json({
                success: false,
                data: {},
                message: "Invalid password",
                err: error.message
            })
        }
        else{
            res.status(500).json({
                success: false,
                data: {},
                message: "Something went wrong",
                err: error.message
            })
        }
    }
}


// forgot password

export async function forgotPassword(req, res){
    const {email} = req.body;
    console.log("email", email);
    try {
        const response = await userservice.forgotUserPassword(email);
    
        res.status(200).json({
            success: true,
            data: response,
            message: "Password reset email sent successfully",
            err: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: error.message
        })
    }
}

// reset password

export async function resetPassword(req, res){ 
    const {email, otp, newPassword} = req.body;
    console.log("email", email, "otp", otp, "newPassword", newPassword);
    if(!email || !otp || !newPassword){
        return res.status(403).json({
            success:false,
            data:{},
            message:"All fields are required",
            err:{}
        })
    }
    try {
        const response = await userservice.resetUserPassword(email, otp, newPassword);
    
        res.status(200).json({
            success: true,
            data: response,
            message: "Password reset successfully",
            err: {}
        })
    } catch (error) {
        if(error.message === "invalid verification code"){
            res.status(400).json({
                success: false,
                data: {},
                message: "invalid verification code",
                err: error.message
            })
        }
        if(error.message === "User not found"){
            res.status(404).json({
                success: false,
                data: {},
                message: "User not found",
                err: error.message
            })
        }
        else{
            res.status(500).json({
                success: false,
                data: {},
                message: "Something went wrong",
                err: error.message
            })
        }
    }
} 




