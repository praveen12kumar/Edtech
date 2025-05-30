import { CourseService } from "../services/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import { logger } from "../utils/logger.js";

const courseService = new CourseService();


export const createCourse = catchAsyncError(async(req, res, next)=>{
    const {title, description, price, discount, createdBy} = req.body;
    const localImagePath = req?.file?.path;

    if(!title || !description || !price || !createdBy){
        return next(new ErrorHandler("All fields are required", 403));
    }
    if(!localImagePath){
        return next(new ErrorHandler("Thumbnail is required", 403));
    }
    if(isNaN(price)){
        return next(new ErrorHandler("Price must be a number", 403));
    }
        const response = await courseService.createCourse({title, description, price, discount, createdBy, thumbnail: localImagePath});
        res.status(201).json({
            success: true,
            data: response,
            message: "Course created successfully",
            err: {}
        })
});


// get All courses
export const getAllCourses = catchAsyncError(async(req, res, next)=>{

    const response = await courseService.getAllCourses();

    res.status(200).json({
        success: true,
        data: response,
        message: "Courses fetched successfully",
        err: {}
    })
})



// get Course Detail

export const getCourseDetails = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    if(!id){
        return next(new ErrorHandler("Course ID is required", 403));
    }
    const response = await courseService.getCourseDetail(id);
    res.status(200).json({
        success: true,
        data: response,
        message: "Course fetched successfully",
        err: {}
    })
});
   

// update course
export const updateCourse = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;

    const localImagePath = req?.file?.path;
    if(!id){
        return next(new ErrorHandler("Course Id is required", 403));
    }

    const response = await courseService.updateCourse(id, req.body, localImagePath);
    res.status(200).json({
        success: true,
        data: response,
        message: "Course updated successfully",
        err: {}
    })
})


// delete a course

export const deleteCourse = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    if(!id){
        return next(new ErrorHandler("Course ID is required", 403));
    }
    const response = await courseService.deleteCourse(id);
    res.status(200).json({
        success: true,
        data: response,
        message: "Course deleted successfully",
        err: {}
    })
});