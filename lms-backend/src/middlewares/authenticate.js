import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import ErrorHandler from '../utils/errorHandler.js';

export const authenticate = (req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return next(new ErrorHandler("Invalid token", 401));
        }
        const user = jwt.verify(token, JWT_SECRET );

        if(!user){
            return next(new ErrorHandler("Invalid user", 401));
        }
        req.user = user;
        next();

    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500));
    }
}