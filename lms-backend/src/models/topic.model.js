import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    lectures:[{
        type:Schema.Types.ObjectId,
        ref:"Lecture",
    }],

    courseRefs:[{
        type:Schema.Types.ObjectId,
        ref:"Course",
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    numOfLectures:{
        type:Number,
        default:0
    }
});


const Topic = mongoose.model("Topic", topicSchema);
export default Topic;



