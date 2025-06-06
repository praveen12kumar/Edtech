import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true, 
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    topics:[{
        type:Schema.Types.ObjectId,
        ref:"Topic",
    }],
    thumbnail:{
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
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
        min:0
    },
    createdBy:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
export default Course;