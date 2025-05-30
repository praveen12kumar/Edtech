import {CrudRepository} from "./index.js";
import Course from "../models/course.model.js";
import { logger } from "../utils/logger.js";


class CourseRepository extends CrudRepository {
    constructor() {
        super(Course);
    }

    async findCourseById(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findCourseByIdAndUpdateTopic(courseId, topicId){
        try {
            const result = await this.model.findByIdAndUpdate(courseId, {$push :{topics:topicId}}, {new:true});
            //logger.info(`Topic added to course: ${result}`);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findCourseByIdAndDeleteTopic(courseId, topicId){
        try {
            const result = await this.model.findByIdAndDelete(courseId, {$pull :{topics:topicId}});
        
            return result;
        } catch (error) {
            throw error;
        }
    }


    async getAll(){
        const response = await this.model.find();
        return response;
    }


    async getCourseById(id){
        const course = await Course.findById(id)
            .populate({
                path: "topics",
                select: "title lectures",
                populate: {
                    path: "lectures",
                    select: "title description duration"
                }
            })
            .lean();
        return course;
    }


    async findCourseByIdAndUpdate(courseId, data){
        try {
            const result = await this.model.findByIdAndUpdate(courseId,data, {new:true});
            //logger.info(`Lecture added to course: ${result}`);
            return result;
        } catch (error) {
            throw error;
        }
    }


    async deleteCourseById(courseId){
        try {
            const result = await this.model.findByIdAndDelete(courseId);
            return result;
        } catch (error) {
            throw error;
        }
    }

}

export default CourseRepository;