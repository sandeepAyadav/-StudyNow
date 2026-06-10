import express from "express";
import { Coursereview, getAllReview } from "../controllers/reviewController.js"; 
import { authware } from "../middleware/authMiddleware.js"; 

const router = express.Router();


router.post("/add/:courseId", authware, Coursereview);


router.get("/all/:courseId", getAllReview);

export default router;