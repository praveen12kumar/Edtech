import { TopicRepository } from "../repository/index.js";
import { CourseRepository } from "../repository/index.js";
import { LectureRepository } from "../repository/index.js";


import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";



class TopicService{

    constructor(){
        this.topicRepository = new TopicRepository();
        this.courseRepository = new CourseRepository(); 
        this.lectureRepository = new LectureRepository();
    }


    async createTopic(data){
    
        const {title, courseId} = data;
        
        try {
            const course = await this.courseRepository.findCourseById(courseId);

            if(!course){
                throw new ErrorHandler("Course not found", 404);
            }
            // check is their a topic with the same title in the course
            const existingTopic = await this.topicRepository.findTopicByTitleAndCourse(title, courseId)
            
            if(existingTopic){
                throw new ErrorHandler("Topic already exists", 400);
            }
            
            const topic = await this.topicRepository.createTopic({title, courseId});
            
            
            await this.courseRepository.findCourseByIdAndUpdateTopic(courseId, topic._id);
            
            return topic;
        } catch (error) {
            throw new ErrorHandler(error.message ||"Internal Server Error", 500);
        }
    }

    // Update Topic

    async updateTopic(id, title){
        try {
            let topic = await this.topicRepository.findTopicById(id);

            if(!topic){
                throw new ErrorHandler("Topic not found", 404);
            }

            topic = await this.topicRepository.findTopicByIdAndUpdate(id, title);
            return topic;

        } catch (error) {
            
        }
    }

    // delete Topic

    async deleteTopic(id){
        try {
            const topic = await this.topicRepository.findTopicById(id);
            // logger.info(`topic: ${topic}`);
            if(!topic){
                throw new ErrorHandler("Topic not found", 404);
            }

            // delete the lectures that are associated with the topic

            for(const lectureId of topic.lectures){
                
                const count = await this.lectureRepository.countLecturesInTopic(lectureId);
               
                if(count === 1){
                    await this.lectureRepository.deleteLectureById(lectureId);
                }
            }

            // delete the topic from the course

             await this.courseRepository.findCourseByIdAndDeleteTopic(topic.courseId, topic._id);
            

            // delete the topic

             await this.topicRepository.findTopicByIdAndDelete(id);

            return {
                success: true,
                message: "Topic deleted successfully",

            }
        } catch (error) {
            console.log("error:",error);
            throw(error.message || "Internal Server Error", 500);
        }
    }

}

export default TopicService;