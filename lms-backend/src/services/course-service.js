import { CourseRepository } from "../repository/index.js";
import  uploadOnCloudinary  from "../config/cloudinary-config.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";
import { deleteFromCloudinary } from "../config/cloudinary-delete-config.js";
import {TopicRepository} from "../repository/index.js";


class CourseService {

    constructor(){
        this.courseRepository = new CourseRepository();
        this.topicRepository = new TopicRepository();
    }

    async createCourse({ title, description, price, thumbnail }) {
        try {
            // Upload thumbnail to cloudinary
            const cloudImage = await uploadOnCloudinary(thumbnail);
            if (!cloudImage || !cloudImage.secure_url) {
                throw new Error("Thumbnail upload failed");
            }

            // Create course
            const course = await this.courseRepository.create({
                title,
                description,
                price,
                thumbnail: {
                    public_id: cloudImage.public_id,
                    url: cloudImage.secure_url
                }
            });

            return course;
        } catch (error) {
            throw new Error(error.message || "Unable to create course");
        }
    }

    async getAllCourses(){
        try {
            const courses = await this.courseRepository.getAll();
            return courses;
        } catch (error) {
            throw new Error("Unable to get all courses", 403);
        }
    }

    // get course by Id
    async getCourseDetail(id){
        try {
            const course = await this.courseRepository.getCourseById(id);
            return course;
        } catch (error) {
            throw new Error("Unable to get course details", 403);
        }
    }

    // delete course

    async deleteCourse(courseId){
        try {
            const course = await this.courseRepository.findCourseById(courseId);

            if(!course){
                throw new ErrorHandler("Course not found", 404);
            }
            await this.topicRepository.deleteTopicByCourseId(courseId);

            if(course.thumbnail?.public_id){
                await deleteFromCloudinary(course.thumbnail.public_id);
            }

            const result = await this.courseRepository.deleteCourseById(courseId);

            return result;
        } catch (error) {
            throw new Error("Unable to delete course", 403);
        }
    }

    async updateCourse(id, data, thumbnail){
        try {
            const course = await this.courseRepository.findCourseById(id);
            //logger.info(`Course updated: ${course}`);
            if(!course){
                throw new ErrorHandler("Course not found", 404);
            }

            if(thumbnail){

                if (course.thumbnail.public_id) {
                    await deleteFromCloudinary(course.thumbnail.public_id);
                }

                const cloudImage = await uploadOnCloudinary(thumbnail);
                if (!cloudImage || !cloudImage.secure_url) {
                    throw new Error("Thumbnail upload failed");
                }
                course.thumbnail.public_id = cloudImage.public_id;
                course.thumbnail.url = cloudImage.secure_url;
                await course.save();
            }

            const updatedCourse = await this.courseRepository.findCourseByIdAndUpdate(id, data);
            return updatedCourse;

        } catch (error) {
            throw new Error("Unable to update course", 403);
        }
    }


};


export default CourseService;
