import { TopicRepository } from "../repository/index.js";
import { CourseRepository } from "../repository/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";





class TopicService{

    constructor(){
        this.topicRepository = new TopicRepository();
        this.courseRepository = new CourseRepository(); 
    }


    async createTopic(data){
    
        const {title, courseId} = data;
        try {
            const course = await this.courseRepository.findCourseById(courseId);

            if(!course){
                throw new ErrorHandler("Course not found", 404);
            }
            let topic = await this.topicRepository.findTopicByTitle(title);

            if(topic){
                if(!topic.courseRefs.includes(courseId)){
                    topic.courseRefs.push(courseId);
                    await topic.save();
                }
            }
            else{
                topic = await this.topicRepository.createTopic({title, courseRefs:[ courseId]});
            }
            
            await this.courseRepository.findCourseByIdAndUpdateTopic(courseId, topic._id);
            //logger.info(`Topic created: ${topic}`);
            return topic;
        } catch (error) {
            throw new ErrorHandler(error.message ||"Internal Server Error", 500);
        }
    }
}

export default TopicService;