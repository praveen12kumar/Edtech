import {CrudRepository} from "./index.js";
import Lecture from "../models/lecture.model.js";

class LectureRepository extends CrudRepository {
    constructor() {
        super(Lecture);
    }
}

export default LectureRepository;
