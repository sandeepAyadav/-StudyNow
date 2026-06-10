import mongoose, { Mongoose } from "mongoose";

 const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        url:{type:String, required:true},
        public_id :{type:String, required:true}
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
}]
    
},{ timestamps: true })
export const Course = mongoose.model("Course",courseSchema)