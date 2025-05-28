import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    lectures:[{
        type:Schema.Types.ObjectId,
        ref:"Lecture",
    }],
}, {
    timestamps:true
});



const Topic = mongoose.model("Topic", topicSchema);
export default Topic;



