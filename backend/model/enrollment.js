import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    enrollAt:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:String,
        default:"free_course"
    }


},{timestamp:true});
enrollmentSchema.index({userId:1,courseId:1},{unique:true})
export const Enrollment = mongoose.model("Enrollment",enrollmentSchema);