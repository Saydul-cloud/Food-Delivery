import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Footer from './components/footer/Footer'
import LoginPopup from './components/loginpopup/LoginPopup'
import Verify from './pages/verify/Verify'

// 💡 ফোল্ডারের আসল বানান অনুযায়ী ইমপোর্ট করুন (MyOrders)
import MyOrders from './pages/MyOrders/MyOrders' 

// React Toastify ইমপোর্ট
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

    const [showLogin, setShowLogin] = useState(false) 

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} theme="light" />

    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
    
    <div className='app'>
     <Navbar setShowLogin={setShowLogin} />
     
     <Routes> 
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path='/verify' element={<Verify/>} />
      
      {/* 🛠️ এখানে element এর ভেতর 'MyOrders' এর বানান বড় হাতের 'O' দিয়ে ঠিক করা হলো */}
      <Route path='/myorders' element={<MyOrders />} /> 
     </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
