import mongoose from "mongoose";
const lectureSchema = new mongoose.Schema({
    courseId:{
         type:mongoose.Schema.Types.ObjectId,
          ref:"Course",
            required:true
    },
    heading:{
        type:String,
        required:true
    },
    subHeading:{
         type:String,
         required:true
    },
    videoUrl:{
        type:String,
        required: true
    },
    public_id:{
        type:String
    },
    duration:{
        type:String
    },
    lectureNumber:{
        type:Number,
        required:true
    },
    isPreview: {
        type: Boolean,
        default: false 
    }

},{ timestamps: true })
export const Lecture = mongoose.model("Lecture",lectureSchema);