
import express from "express"
import { isTeacherWare } from "../middleware/role.js";
import { createCourselecture, getSingleLectureDetails } from "../controllers/lectureController.js";
import { authware } from "../middleware/authMiddleware.js";
import upload from "../utils/multer.js";
const route = express.Router();
route.post("/createlecture/:courseId",authware,isTeacherWare,upload.single("video"),createCourselecture);
route.get("/singlecourse/:courseid",getSingleLectureDetails)
export default route