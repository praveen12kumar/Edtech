import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength:[20,"Name must be less than 20 characters"],
        minLength:[5, "Name must be more than 5 characters"],  // Fixed the typo
        trim: true,
        lowerCase: true
    },
    email:{
        type:String,
        required: [true,"Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        match:[/\S+@\S+\.\S+/, 'Please fill a valid email'],
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        minLength:[5, "Password must be at least 5 characters"],
        select: false,
        trim: true
    },
    avatar:{
        public_id:{
            type: String,
        },
        secure_url:{
            type:String,
        } 
    },
    role:{
        type: String,
        enum:["USER", "ADMIN"],
        default:"USER"
    },

    isVerified:{
        type: Boolean,
        default: false
    },

    resetPasswordToken:String,

    resetPasswordTokenExpiry:Date,

    verifyPasswordOTP: String,

    verifyPasswordOTPExpiry:Date,

    subscription:{
        id:String,
        status: String
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(this.password, salt);
        this.password = encryptedPassword;

        // Ensure avatar field exists before accessing properties
        if (!this.avatar || !this.avatar.secure_url) {
            const newName = this.username.split(" ").join("");
            this.avatar = this.avatar || {};  // Ensure avatar is an object
            this.avatar.public_id = newName;
            this.avatar.secure_url = `https://robohash.org/${newName}`;
        }

        if(!this.isVerified){
            this.generateOTP();
        }

        next();
    } catch (error) {
        console.log("Error saving user", error);
        next(error);
    }  
});

userSchema.methods.comparePassword = async function(password) {
    const result = await bcrypt.compare(password, this.password);
    return result;  
};

userSchema.methods.generateToken = async function() {
    const token = await jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    }, JWT_SECRET, {expiresIn: "1d"});
    return token;
};


userSchema.methods.generateOTP = function(){
        const verToken = Math.floor(100000 + Math.random() * 900000).toString();
        this.verifyPasswordOTP = verToken;
        this.verifyPasswordOTPExpiry = Date.now() + 15 * 60 * 1000;
    
};

const User = mongoose.model('users', userSchema);

export default User;
