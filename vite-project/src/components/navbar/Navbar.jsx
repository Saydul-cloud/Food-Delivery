import React, { useState, useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom' // useNavigate যোগ করা হয়েছে লগআউটের পর হোমপেজে যাওয়ার জন্য
import { StoreContext } from '../../context/StoreContext'

const Navber = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ড্রপডাউনের জন্য নতুন স্টেট

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // লগআউট ফাংশন
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : " "}>Contact us </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"} ></div>
        </div>
        
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          /* এখানেonClick দিয়ে স্টেট পরিবর্তন করা হচ্ছে */
          <div className='navbar-profile' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={assets.profile_icon} alt="" />
            
            {/* স্টেট true হলেই কেবল ড্রপডাউনটি স্ক্রিনে দেখাবে */}
            {isDropdownOpen && (
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navber
