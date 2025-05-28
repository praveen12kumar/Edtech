import { TopicService } from "../services/index.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";


const topicService = new TopicService();


export const createTopic = catchAsyncError(async (req, res, next)=>{
    const {title, courseId} = req.body;
    if(!title || !courseId){
        return next(new ErrorHandler("All fields are required", 403));
    }
        const response = await topicService.createTopic({title, courseId});
        return res.status(200).json(response);
});


export const updateTopic = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!id) {
        return next(new ErrorHandler("Topic ID is required", 403));
    }

    const response = await topicService.updateTopic(id, title);

    return res.status(200).json({
        success: true,
        message: "Topic updated successfully",
        data: response
    });
});


// delete topic

export const deleteTopic = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    
    if(!id){
        return next(new ErrorHandler("Topic ID is required", 403));
    }
    const response = await topicService.deleteTopic(id);
    return res.status(200).json(response);

})