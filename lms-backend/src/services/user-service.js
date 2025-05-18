
import { UserRepository } from "../repository/index.js";
import uploadOnCloudinary from "../config/cloudinary-config.js";
import {sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from "../nodemailer/email.js"
import ErrorHandler from "../utils/errorHandler.js";


class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(username, email, password, localFilePath) {
        //console.log(username, email, password, localFilePath);
        // Check if the user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ErrorHandler("User already exists", 409);
        }

        // Validate file type (image)
        if (!localFilePath || !localFilePath.match(/\.(jpg|jpeg|png)$/)) {
            throw new ErrorHandler("Invalid file type. Only JPG, JPEG, and PNG files are allowed.", 415);
        }

        // Upload profile image to Cloudinary
        const result = await uploadOnCloudinary(localFilePath, "profile");
        if (!result) {
            throw new ErrorHandler("Profile picture upload failed", 503);
        }

        // Create new user in the database
        const user = await this.userRepository.create({
            username,
            email,
            password,  // Save hashed password
            avatar: {
                public_id: result?.public_id,
                secure_url: result?.secure_url
            }
        });

        // Generate JWT token
        const token = await user.generateToken();

        user.generateOTP();
        await user.save();
        // Send verification email
        sendVerificationEmail(user?.email, user?.verifyPasswordOTP);

        return { token, user };
    
}


    async signIn(email, password) {
        //console.log("email", email, "password", password);

        const user = await this.userRepository.findByEmail(email);
        //console.log("user", user);
        if(!user){
            throw new ErrorHandler("User not found", 404);
        }

        const isValidPassword = await user.comparePassword(password);
        //console.log("isValidPassword", isValidPassword);

        if(!isValidPassword){
            throw new Error("Invalid password", 401);
        }

        const token = await user.generateToken();

        

        return {token, user};
    }


    // get Profile
    async getProfile(userId) {
        const user = await this.userRepository.get(userId);
        if(!user){
            throw new ErrorHandler("User not found", 404);
        }
        return user;
    }

    
    // verify user email

    async verifyUserEmail(otp){
            const user = await this.userRepository.findUserByToken(otp);
            //console.log("user", user);
            if(!user){
                throw new ErrorHandler("Invalid OTP", 404);
            }

            user.isVerified = true;
            user.verifyPasswordOTP = null;
            user.verifyPasswordOTPExpiry = null;
            await user.save();

            await sendWelcomeEmail(user?.email, user?.username);
            return user;
    } 


    // change user password

    async changeUserPassword(userId, oldPassword, newPassword){
        const user = await this.userRepository.get(userId);
       

        if(!user){
            throw new ErrorHandler("User not found", 404);
        }

        const isValidPassword = await user.comparePassword(oldPassword);
        if(!isValidPassword){
            throw new ErrorHandler("Invalid password", 401);
        }

        user.password = newPassword;
        await user.save();
        return user;
    }


    async forgotUserPassword(email){
        const user = await this.userRepository.findByEmail(email);
        
        if(!user){
            throw new ErrorHandler("User not found", 404);
        }
        
        user.generateOTP();
        await user.save();

        //console.log("user", user);  

        await sendPasswordResetEmail(user?.email, user?.verifyPasswordOTP);
        return user;
    }


    async resetUserPassword(email, otp, newPassword) {
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new ErrorHandler("User not found", 404);
        }
        if(!user.verifyPasswordOTPExpiry > Date.now() || user.verifyPasswordOTP !== otp){
            throw new Error("invalid verification code");
        }

        user.password = newPassword;
        user.verifyPasswordOTP = null;
        user.verifyPasswordOTPExpiry = null;
        await user.save();
        return user;
    }


}

export default UserService;