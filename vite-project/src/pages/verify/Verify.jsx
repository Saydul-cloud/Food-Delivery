import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      // 💡 ফ্রন্টএন্ড থেকে ডেটা পাঠানোর সময় নিশ্চিত করা হলো যেন ছোট হাতের স্ট্রিং যায়
      const response = await axios.post(url + "/api/order/verify", { 
        success: String(success).toLowerCase(), 
        orderId 
      });
      
      console.log("Verification Response:", response.data);

      // 💡 পেমেন্ট সফল বা ব্যর্থ যাই হোক, ২ সেকেন্ড পর হোম পেজে রিডাইরেক্ট করবে (যেহেতু myorders কমেন্ট করা)
      setTimeout(() => {
        navigate("/myorders");
      }, 2000);

    } catch (error) {
      console.error("Payment verification failed on Frontend:", error);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    if (orderId && success) {
      verifyPayment();
    }
  }, [success, orderId]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
