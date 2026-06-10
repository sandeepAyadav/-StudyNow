import express from "express";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/razorpayController.js";
import { authware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/payment/order/:courseId", authware, createRazorpayOrder);

router.post("/payment/verify", authware, verifyRazorpayPayment);

export default router;

