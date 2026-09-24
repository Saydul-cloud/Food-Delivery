import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { assets } from '../../assets/assets' // আপনার প্রোজেক্টে parcel বা order আইকন থাকলে তার পাথ দিন

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  // ১. সব অর্ডার ডাটাবেজ থেকে আনার ফাংশন
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  }

  // ২. স্ট্যাটাস পরিবর্তন করার জন্য নতুন ফাংশন
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: newStatus
      });

      if (response.data.success) {
        toast.success("Order status updated successfully!");
        await fetchAllOrders(); // স্ট্যাটাস আপডেট হওয়ার পর স্ক্রিন রিফ্রেশ করার জন্য
      } else {
        toast.error("Could not update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            {/* যদি এসেট ফোল্ডারে parcel_icon থাকে তবে এটি ব্যবহার করতে পারেন */}
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            
            <div>
              {/* অর্ডারের আইটেমগুলোর নাম ও সংখ্যা দেখানোর জন্য */}
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>

              {/* কাস্টমারের নাম */}
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>

              {/* কাস্টমারের ঠিকানা */}
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>

              {/* কাস্টমারের ফোন নম্বর */}
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            {/* মোট আইটেম সংখ্যা এবং অর্ডারের মোট মূল্য */}
            <p>Items: {order.items.length}</p>
            <p>\${order.amount}</p>

            {/* স্ট্যাটাস ড্রপডাউন অপশন (Status Dropdown) */}
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders;
