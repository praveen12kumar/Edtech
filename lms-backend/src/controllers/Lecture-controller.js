import { LectureService } from "../services/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { logger } from "../utils/logger.js";


const lectureService = new LectureService();

export const addLecture = catchAsyncError(async(req, res, next)=>{
    const {title, description, topicId} = req.body;

    if(!title || !description || !topicId){
        return next(new ErrorHandler("All fields are required", 403));
    }

    const localVideoPath = req?.file?.path;
    
    if(!localVideoPath){
        return next(new ErrorHandler("Video is required", 403));
    }
    
    const response = await lectureService.addLectureService({title, description, topicId, localVideoPath});
    return res.status(200).json(response);

});


export const getLectureDetails = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    if(!id){
        return next(new ErrorHandler("Lecture Id is required", 403));
    }
    const response = await lectureService.getLectureDetail(id);
    return res.status(200).json(response);
});


export const deleteLecture = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    if(!id){
        return next(new ErrorHandler("Lecture Id is required", 403));
    }
    const response = await lectureService.deleteLecture(id);
    return res.status(200).json(response);
});


export const updateLecture = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    const localVideoPath = req?.file?.path;
    if(!id){
        return next(new ErrorHandler("Lecture Id is required", 403));
    }
    const response = await lectureService.updateLecture(id, req.body, localVideoPath);
    return res.status(200).json(response);
});