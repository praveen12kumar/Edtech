import bcrypt from "bcryptjs";
import { UserRepository } from "../repository/index.js";
import uploadOnCloudinary from "../config/cloudinary-config.js";
import {sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail } from "../nodemailer/email.js"

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async signup(username, email, password, localFilePath) {
        //console.log(username, email, password, localFilePath);
        // Check if the user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Validate file type (image)
        if (!localFilePath || !localFilePath.match(/\.(jpg|jpeg|png)$/)) {
            throw new Error("Invalid file type. Only JPG, JPEG, and PNG files are allowed.");
        }

        // Upload profile image to Cloudinary
        const result = await uploadOnCloudinary(localFilePath, "profile");
        if (!result) {
            throw new Error("Profile picture upload failed");
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
            throw new Error("User does not exist");
        }

        const isValidPassword = await user.comparePassword(password);
        //console.log("isValidPassword", isValidPassword);

        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        const token = await user.generateToken();

        

        return {token, user};
    }


    // get Profile
    async getProfile(userId) {
        const user = await this.userRepository.get(userId);
        if(!user){
            throw new Error("User does not exist");
        }
        return user;
    }

    
    // verify user email

    async verifyUserEmail(otp){
            const user = await this.userRepository.findUserByToken(otp);
            //console.log("user", user);
            if(!user){
                throw new Error("Invalid OTP");
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
        console.log("user aa gye", user);
        if(!user){
            throw new Error("User not found");
        }

        const isValidPassword = await user.comparePassword(oldPassword);
        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        user.password = newPassword;
        await user.save();
        return user;
    }


    async forgotUserPassword(email){
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new Error("User not found");
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
            throw new Error("User not found");
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