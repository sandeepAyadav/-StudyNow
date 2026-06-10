import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();



    cloudinary.config({ 
  cloud_name: "dim2yzni7", 
  api_key: "273338643749558", 
  api_secret: "m2ZPLOfnboUvscAPeveubO50igc" 
});


export const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "courses" }, 
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

export const uploadVideoToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: "video", 
                folder: "course_videos" 
            }, 
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};