import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios' 
import { toast } from 'react-toastify' 

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault(); 
    
    let newUrl = "";
    if (currState === "Login") {
      newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        
        // 🎉 সফল নোটিফিকেশন দেখানো
        if (currState === "Login") {
          toast.success("লগইন সফল হয়েছে! 🎉");
        } else {
          toast.success("রেজিস্ট্রেশন সফল হয়েছে! 🚀");
        }

        // 💡 মূল ট্রিক: পপআপটি সাথে সাথে বন্ধ না করে ব্রাউজারকে পাসওয়ার্ড রিড করার জন্য ৫০০ মিলিগ্রাম সময় দিন
        setTimeout(() => {
          setShowLogin(false);
        }, 500);

      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      console.log("API Error:", error);
      toast.error("সার্ভারের সাথে কানেক্ট করা যাচ্ছে না! ❌");
    }
  }

  return (
    <div className='login-popup'> 
      {/* 💡 নিশ্চিত করুন action এবং method ডিফাইন করা আছে, এটি ব্রাউজারকে ডিটেক্ট করতে সাহায্য করে */}
      <form onSubmit={onLogin} action="#" method="POST" className="login-popup-container"> 
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />   
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" 
            ? <></> 
            : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' autoComplete="name" required/>
          }
          {/* 💡 name="username" বা name="email" দুটির যেকোনো একটি স্ট্যান্ডার্ড রাখুন */}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' autoComplete="username" required/>
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' autoComplete="current-password" required/>
        </div>
        
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        
        {currState === "Login" 
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
