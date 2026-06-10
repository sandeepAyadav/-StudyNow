import express from "express"
import { authware } from "../middleware/authMiddleware.js";
import { isStudent, isTeacherWare } from "../middleware/role.js";
import { courses, getAllCourse} from "../controllers/courseController.js";

import upload from "../utils/multer.js";
const route = express.Router();
route.post("/course",authware,isTeacherWare,upload.single("file"),courses)
route.get("/all-courses",getAllCourse)

// route.get("/course/:courseId", getCourseDetails);
export default route