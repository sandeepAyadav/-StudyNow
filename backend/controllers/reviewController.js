import { Enrollment } from "../model/enrollment.js";
import { Review } from "../model/Review.js";
import mongoose from "mongoose";
export const Coursereview = async (req, res) => {
    try {
        const { star, comment } = req.body;
        const { courseId } = req.params;
        
       
        const userId = req.user._id; 

        if (!star || !comment) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide both star rating and comment."
            });
        }

       
        const hasPurchased = await Enrollment.findOne({ userId, courseId });
        if (!hasPurchased) {
            return res.status(403).json({ 
                success: false,
                message: "You cannot review this course because you haven't purchased it."
            });
        }

      
        const review = await Review.create({
            userId,
            courseId,
            star,
            comment
        });

        return res.status(201).json({
            success: true,
            message: "Review submitted successfully! 🎉",
            review
        });

    } catch (error) {
        console.log(error);

       
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course."
            });
        }

      
        return res.status(500).json({
            success: false,
            message: "Failed to submit review due to an internal server error."
        });
    }
};



export const getAllReview = async (req, res) => {
    try {
        const { courseId } = req.params;

        
        const allreview = await Review.find({ courseId }).populate("userId", "name");

        return res.status(200).json({
            success: true,
            count: allreview.length, 
            allreview
        });

    } catch (error) {
        console.log(error); 
        return res.status(500).json({ 
            success: false, 
            message: "Failed to fetch reviews. Internal server error." 
        });
    }
};


export const averagerating = async (courseId) => {
    try {
        
        const stats = await Review.aggregate([
            {
                
                $match: { courseId: new mongoose.Types.ObjectId(courseId) }
            },
            {
               
                $group: {
                    _id: "$courseId",
                   
                    averageRating: { $avg: "$star" }, 
                    numberofReview: { $sum: 1 }
                }
            }
        ]);

        
        if (stats.length > 0) {
            return {
               
                averageRating: Math.round(stats[0].averageRating * 10) / 10,
                numberofReview: stats[0].numberofReview
            };
        } else {
            
            return { averageRating: 0, numberofReview: 0 };
        }

    } catch (error) {
        console.log("Error in averagerating helper:", error);
        return { averageRating: 0, numberofReview: 0 };
    }
};