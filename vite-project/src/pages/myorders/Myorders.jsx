import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // ব্যাকএন্ড থেকে ইউজারের অর্ডার ডাটা নিয়ে আসার ফাংশন
    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            if (response.data.success) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("অর্ডার লিস্ট লোড করতে সমস্যা হয়েছে:", error);
        }
    };

    // 💡 Track Order বাটনে ক্লিক করলে লাইভ স্ট্যাটাস দেখানোর কাস্টম ফাংশন
    const handleTrackOrder = (status) => {
        let currentStatus = "অর্ডার প্রসেস হচ্ছে";

        // 🛠️ এখানে 'Out for delivery' (ছোট হাতের d) করা হলো অ্যাডমিন প্যানেলের সাথে মিল রেখে
        if (status === "Food Processing") {
            currentStatus = "🍳 আপনার খাবারটি শেফ তৈরি করছেন (Food Processing)";
        } else if (status === "Out for delivery") {
            currentStatus = "🚴 আমাদের ডেলিভারি বয় আপনার খাবার নিয়ে বের হয়েছেন (Out for Delivery)";
        } else if (status === "Delivered") {
            currentStatus = "✅ আপনার খাবারটি সফলভাবে ডেলিভারি করা হয়েছে (Delivered)";
        } else {
            currentStatus = "⏳ আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে (Pending)";
        }

        // কাস্টমারকে অ্যালার্টের মাধ্যমে লাইভ স্ট্যাটাস দেখানো
        alert(`অর্ডার ট্র্যাকিং তথ্য:\n${currentStatus}`);

        // একই সাথে ডাটাবেজ থেকে লেটেস্ট স্ট্যাটাস রিফ্রেশ করে নেওয়া হবে
        fetchOrders();
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>আপনার কোনো অর্ডার পাওয়া যায়নি।</p>
                ) : (
                
        data.map((order, index) => {
          return (
     <div key={index} className='my-orders-order'>
         <p className='box-icon'>📦</p>
          <p>
     {order.items.map((item, idx) => {
        if (idx === order.items.length - 1) {
            return item.name + " x " + item.quantity;
           } else {
               return item.name + " x " + item.quantity + ", ";
         }
         })}
         </p>
        <p>\${order.amount}.00</p>
     <p>Items: {order.items.length}</p>
     {/* স্ট্যাটাস অনুযায়ী ডট কালার ডাইনামিক করার সুবিধা */}
     <p>
    <span className={`status-dot ${order.status.toLowerCase().replace(/ /g, '-')}`}>●</span>
     <b> {order.status}</b>
     </p>
      <button onClick={() => handleTrackOrder(order.status)}>Track Order</button>
        </div>
         );
         })
         )}
            </div>
        </div>
    );
};

export default MyOrders;
