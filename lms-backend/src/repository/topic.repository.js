import {CrudRepository} from "./index.js";
import Topic from "../models/topic.model.js";
import { logger } from "../utils/logger.js";


class TopicRepository extends CrudRepository{
    constructor(){
        super(Topic);
    }

    async createTopic(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findTopicByTitle(title) {
        try {
            const result = await this.model.findOne({ title });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteTopicByCourseId(courseId){
        try {
            await this.model.updateMany({courseRefs: courseId}, {$pull:{courseRefs: courseId}});
        } catch (error) {
            throw error;
        }
    }

    async findTopicById(topicId){
        try {
            const result = await this.model.findById(topicId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findTopicByTitleAndCourse(title, courseId) {
        return await this.model.findOne({ title, courseId });
      }


    async findTopicByIdAndUpdate(id, title){
       
        try {
            const result = await this.model.findByIdAndUpdate(id, {title}, {new:true});
            return result;
        } catch (error) {
            throw error;
        }
    }


    async findTopicByIdAndDelete(topicId){
        try {
            const result = await this.model.findByIdAndDelete(topicId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    

   


}

export default TopicRepository;