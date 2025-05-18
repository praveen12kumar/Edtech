import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";

export const authorizeAdmin = (req, res, next)=>{
    try {
        const user = req.user;
        //logger.info(`User role: ${user.role}`);
        if(!user || user.role !== 'ADMIN'){
            return next (new ErrorHandler("Only admin can access this route", 403));
        }

        next();


    } catch (error) {
        return next(new ErrorHandler("Something went wrong", 500));   
    }
}