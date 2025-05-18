import { TopicService } from "../services/index.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

const topicService = new TopicService();

export const createTopic = catchAsyncError(async (req, res, next)=>{
    const {title, courseId} = req.body;
    if(!title || !courseId){
        return next(new ErrorHandler("All fields are required", 403));
    }
        const response = await topicService.createTopic({title, courseId});
        return res.status(200).json(response);

});