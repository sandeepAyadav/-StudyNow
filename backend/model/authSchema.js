import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["Student","Teacher"],
        required:true
    },
    forgotPasswordOtp: {
    type: Number
},
forgotPasswordOtpExpiry: {
    type: Date
}

});
export const User =  mongoose.model("User",userSchema)