import { Course } from "../model/course.js";
import { v2 as cloudinary } from "cloudinary"; 
import fs from "fs"; 

cloudinary.config({ 
  cloud_name: "dim2yzni7", 
  api_key: "273338643749558", 
  api_secret: "m2ZPLOfnboUvscAPeveubO50igc" 
});


export const courses = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const file = req.file;

        if (!title || !description || !price || !file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
            folder: "courses"
        });

        fs.unlinkSync(file.path);

        const newCreate = await Course.create({
            title,
            description,
            price,
            image: {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            },
            createdBy: req.user._id
        });

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            newCreate
        });

    } catch (error) {
        console.log("Controller Error:", error);
        if (req.file && req.file.path) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: "Course not created due to server error"
        });
    }
};




export const getAllCourse = async (req, res) => {
    try {
        const { search } = req.query;
        
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        let queryObj = {};

        if (search) {
            queryObj.title = { 
                $regex: search, 
                $options: "i" 
            };
        }

   
        const totalCourses = await Course.countDocuments(queryObj);

        
        const course = await Course.find(queryObj)
            .populate("createdBy", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "All courses given successfully",
            success: true,
            totalCourses, 
            totalPages: Math.ceil(totalCourses / limit), 
            currentPage: page,
            allCourses: course 
        });

    } catch (error) {
        console.log("Fetch Error Trace:", error);
        return res.status(500).json({
            success: false,
            message: "No courses displayed due to internal server failure."
        });
    }
};