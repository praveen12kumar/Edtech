import mongoose, {Schema} from "mongoose";


const lectureSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        public_id: {
            type: String,
            required: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        }
    },
    duration:{
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Lecture', lectureSchema);
    