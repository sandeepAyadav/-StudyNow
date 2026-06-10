import React, { useState, useEffect } from "react"; // ✅ useState ko import kiya
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment, verifyPayment, resetPaymentState } from "../slice/paymentSlice";

const BuyButton = ({ courseId, coursePrice, courseName }) => {
    const dispatch = useDispatch();
    
   
    const [localLoading, setLocalLoading] = useState(false);
    
    
    const { paymentSuccess, error } = useSelector((state) => state.payment);

    useEffect(() => {
        if (paymentSuccess) {
            alert("🎉 Payment Successful! Course unlocked.");
            dispatch(resetPaymentState());
        }
        if (error) {
            alert(`❌ Error: ${error}`);
            dispatch(resetPaymentState());
            setLocalLoading(false); 
        }
    }, [paymentSuccess, error, dispatch]);

    const handlePaymentClick = async () => {
      
        setLocalLoading(true);

        const resultAction = await dispatch(initiatePayment(courseId));

        if (initiatePayment.fulfilled.match(resultAction)) {
            const order = resultAction.payload.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "StudyNow",
                description: `Buying: ${courseName}`,
                order_id: order.id, 
                handler: function (response) {
                    const verificationData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        courseId: courseId
                    };
                    dispatch(verifyPayment(verificationData));
                    setLocalLoading(false);
                },
                prefill: {
                    name: "User",
                    email: "user@example.com"
                },
                theme: {
                    color: "#4F46E5"
                },
                
                modal: {
                    ondismiss: function() {
                        setLocalLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on("payment.failed", function (response) {
                alert(`Payment Fail Ho Gayi: ${response.error.description}`);
                setLocalLoading(false);
            });

            rzp.open();
        } else {
            
            setLocalLoading(false);
        }
    };

    return (
        <button
            onClick={handlePaymentClick}
            disabled={localLoading} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded transition-colors text-center text-sm disabled:bg-gray-400"
        >
            {localLoading ? "Please wait..." : `Buy Now`}
        </button>
    );
};

export default BuyButton;