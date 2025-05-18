import mongoose, {Schema} from "mongoose";


const lectureSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
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
    topicId: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Lecture', lectureSchema);
    