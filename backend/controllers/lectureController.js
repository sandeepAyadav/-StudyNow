import { Enrollment } from "../model/enrollment.js";
import { Lecture } from "../model/lecture.js";
import { Course } from "../model/course.js"; 
import { v2 as cloudinary } from "cloudinary"; 

import {uploadToCloudinary,uploadVideoToCloudinary} from "../utils/cloudinary.js"; 
import { averagerating } from "./reviewController.js";
cloudinary.config({ 
  cloud_name: "dim2yzni7", 
  api_key: "273338643749558", 
  api_secret:"m2ZPLOfnboUvscAPeveubO50igc" 
});
export const createCourselecture = async (req, res) => {
    try {
        
        const { heading, subHeading, lectureNumber, isPreview } = req.body;
        const { courseId } = req.params; 
        const file = req.file; 

        if (!heading || !lectureNumber || !file) {
            return res.status(400).json({
                success: false,
                message: "Heading, lecture number, and video file are required."
            });
        }

        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

         const teacherId = course.createdBy ? course.createdBy.toString() : course.teacher.toString();
        
        if (teacherId !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You are not the creator of this course."
            });
        }

        
        const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
            resource_type: "video",
            folder: "lms_lectures"
        });

        
        const newLecture = await Lecture.create({
            heading,
            subHeading,
            lectureNumber,
            isPreview: isPreview || false,
            videoUrl: cloudinaryResult.secure_url,
            public_id: cloudinaryResult.public_id,
            courseId: courseId 
        });

        
        course.lectures.push(newLecture._id);
        await course.save();

        return res.status(200).json({
            success: true,
            message: "Lecture successfully created and added to course",
            lecture: newLecture
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Lecture not created. Internal server error."
        });
    }
};

export const getSingleLectureDetails = async (req, res) => {
    try {
        
        const { courseid } = req.params;

        
        const course = await Course.findById(courseid)
            .populate("createdBy", "name email")
            .populate("lectures");

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const ratingStats = await averagerating(courseid);

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            lecture:course.lectures,
            course:course,
            ratingInfo: ratingStats
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course details. Internal server error."
        });
    }
};


export const getdemoLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        
        const userId = req.user ? req.user._id : null; 

        let hasPurchased = false;

        
        if (userId) {
            const enrollment = await Enrollment.findOne({ userId, courseId });
            if (enrollment) {
                hasPurchased = true;
            }
        }

        const lectures = await Lecture.find({ courseId }).sort({ lectureNumber: 1 });

      
        if (!hasPurchased) {
            const safeLecture = lectures.map(lecture => {
               
                if (lecture.isPreview) {
                    return lecture; 
                }
                
                
                return {
                    heading: lecture.heading,
                    subHeading: lecture.subHeading,
                    lectureNumber: lecture.lectureNumber,
                    isPreview: false,
                    videoUrl: null 
                };
            });

            return res.status(200).json({
                success: true,
                lectures: safeLecture,
                message: "Showing only demo lectures. Purchase to unlock all."
            });
        }

      
        return res.status(200).json({
            success: true,
            lectures,
            message: "All lectures unlocked!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
       
        const userId = req.user ? req.user._id : req.userId; 

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication failed. Please login."
            });
        }

     
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ // 404 Not Found zyada sahi hai
                success: false, // Spelling/Flag sahi kiya
                message: "Course not found"
            });
        }

       
        const isAlreadyEnroll = await Enrollment.findOne({ userId, courseId });
        
        if (isAlreadyEnroll) {
            return res.status(400).json({ 
                success: false,
                message: "You are already enrolled in this course."
            });
        }

       
        const newEnrollment = await Enrollment.create({
            userId,
            courseId,
            paymentId: "FREE_OR_DIRECT_ACCESS"
        });

        return res.status(200).json({
            success: true,
            message: "Congratulations! You have successfully enrolled in the course. 🎉",
            enrollment: newEnrollment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Enrollment failed due to an internal server error."
        });
    }
};