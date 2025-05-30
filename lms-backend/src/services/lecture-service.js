import { LectureRepository } from "../repository/index.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logger } from "../utils/logger.js";
import uploadOnCloudinary from "../config/cloudinary-config.js";
import { deleteFromCloudinary } from "../config/cloudinary-delete-config.js";
import {TopicRepository} from "../repository/index.js";



class LectureService {

    constructor() {
        this.lectureRepository = new LectureRepository();
        this.topicRepository = new TopicRepository();
    }


    async addLectureService(data) {
        const {title,topicId, localVideoPath} = data;
        try {

            const cloudVideo = await uploadOnCloudinary(localVideoPath, "video");
            //console.log("Cloud Video", cloudVideo);

            if (!cloudVideo || !cloudVideo.secure_url) {
                throw new ErrorHandler("Video upload failed", 403);
            }
            
            const lecture = await this.lectureRepository.create({
                title,
                video: {
                    url: cloudVideo.secure_url,
                    public_id: cloudVideo.public_id
                },
                duration: cloudVideo.duration
            });
             
            const topic = await this.topicRepository.findTopicById(topicId);
            if(!topic){
                throw new ErrorHandler("Topic not found", 404);
            }

            topic.lectures.push(lecture._id);
            await topic.save();
            
            return lecture;
        } catch (error) {
            throw error;
        }
    }


    // lecture details

    async getLectureDetail(lectureId) {
        try {
            const lecture = await this.lectureRepository.findLectureById(lectureId);
            return lecture;
        } catch (error) {
            throw error;
        }
    }


    // delete lecture

    async deleteLecture(lectureId) {
        try {
            const lecture = await this.lectureRepository.findLectureById(lectureId);

            if(!lecture){
                throw new ErrorHandler("Lecture not found", 404);
            }

            if(lecture.video.public_id){
                await deleteFromCloudinary(lecture.video.public_id, "video");
            }

            // remove lecture Id from topic
            const topicId = lecture.topicId;

            const topic = await this.topicRepository.findTopicById(topicId);

            if(!topic){
                throw new ErrorHandler("Topic not found", 404);
            }

            topic.lectures.pull(lectureId);
            await topic.save();
            await this.lectureRepository.deleteLectureById(lectureId);

            return {
                success: true,
                message: "Lecture deleted successfully",
                lectureId
            }

        } catch (error) {
            throw error;
        }
    }


    async updateLecture(lectureId, data, localVideoPath) {
        try {
            let lecture = await this.lectureRepository.findLectureById(lectureId);
            if(!lecture){
                throw new ErrorHandler("Lecture not found", 404);
            }

            if(localVideoPath){
                if(lecture.video.public_id){
                    await deleteFromCloudinary(lecture.video.public_id, "video");
                }

                const video = await uploadOnCloudinary(localVideoPath, "video");

                if (!video || !video.secure_url) {
                    throw new ErrorHandler("Video upload failed", 403);
                }
                lecture.video = {
                    url: video.secure_url,
                    public_id: video.public_id
                }

                await lecture.save();
            }


            const updatedLecture = await this.lectureRepository.findLectureByIdAndUpdate(lectureId, data);
            return updatedLecture;
        } catch (error) {
            throw error;
        }
    }


}

export default LectureService;
