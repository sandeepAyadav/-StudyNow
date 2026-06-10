
import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../model/course.js";
import { Enrollment } from "../model/enrollment.js";
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});


export const createRazorpayOrder = async(req,res)=>{
    try {
        const { courseId } = req.params; 
        
        const course = await Course.findById(courseId); 
        
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found." });
        }
        
        const amountInPaise = course.price * 100;

        const options = {
            amount: amountInPaise,
            currency: "INR",
            
            receipt: `receipt_course_${courseId.substring(0, 5)}_${req.user._id.toString().substring(0, 5)}`,
            notes: {
                courseId: course._id.toString(),
                userId: req.user._id.toString()
            }
        };
        
        console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Secret:", process.env.RAZORPAY_KEY_SECRET);
        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order, 
        });
    } catch(error) {
        console.error("Razorpay Order Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
        const userId = req.user._id;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");
            if (razorpay_signature === expectedSign) {
            
            
            await Enrollment.create({
                userId,
                courseId,
                paymentId: razorpay_payment_id
            });

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully! Course unlocked."
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid payment signature. Security breach suspected!" });
        }

    }
    catch (error) {
        console.error("Verification Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};