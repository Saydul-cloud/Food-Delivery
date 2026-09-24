import React, { useState, useContext } from 'react' 
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {
   // 💡 ১. StoreContext থেকে url (http://localhost:4000) নিয়ে আসা হয়েছে
   const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='food-item'>
     <div className="food-item-img-container">
        {/* 💡 ২. নিচে src পরিবর্তন করে ব্যাকএন্ড সার্ভারের আপলোড করা ছবির পাথ দেওয়া হয়েছে */}
        <img className='food-item-image' src={url + "/images/" + image} alt=""/>
        
         {!cartItems[id]
          ? <img className="add" onClick={() =>addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
              <img onClick={() =>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={() =>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div> 
         }
         
     </div>
     <div className="food-item-info">
      <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
      </div>
      <p className="food-item-desc">{description}</p>
      <p className="food-item-price">${price}</p>
     </div>
    </div>
  )
}

export default FoodItem
