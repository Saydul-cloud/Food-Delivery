import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
 
  const [list, setList] = useState([]);
 
  // ডাটাবেজ থেকে লিস্ট নিয়ে আসার ফাংশন
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error");
    }
  }

  // ডাটাবেজ থেকে ফুড আইটেম ডিলিট করার ফাংশন
  const removeFood = async (foodId) => {
    try {
      // এখানে & চিহ্ন পরিবর্তন করে $ করা হয়েছে
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      
      if (response.data.success) {
        toast.success(response.data.message || "Food Removed Successfully");
        await fetchList(); // ডিলিট হওয়ার পর টেবিলটি অটোমেটিক আপডেট হবে
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing food");
    }
  }
  
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              {/* এখানেও & চিহ্ন পরিবর্তন করে $ করা হয়েছে */}
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
