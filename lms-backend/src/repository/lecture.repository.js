import {CrudRepository} from "./index.js";
import Lecture from "../models/lecture.model.js";
import { logger } from "../utils/logger.js";

class LectureRepository extends CrudRepository {
    constructor() {
        super(Lecture);
    }

    async createLectureRepo(data) {
        return await this.model.create(data);
    }

    async findLectureById(id) {
        return await this.model.findById(id);
    }

    async deleteLectureById(lectureId) {
        return await this.model.findByIdAndDelete(lectureId);
    }

    async findLectureByIdAndUpdate(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {new: true});
    }

    async countLecturesInTopic(lectureId) {
        const count =  await this.model.countDocuments({_id:lectureId});
        return count;
    }
}

export default LectureRepository;
