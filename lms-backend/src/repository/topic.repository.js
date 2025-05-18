import {CrudRepository} from "./index.js";
import Topic from "../models/topic.model.js";


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
}

export default TopicRepository;