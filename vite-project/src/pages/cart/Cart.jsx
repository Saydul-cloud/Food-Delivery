import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom' // 👈 রাউটিং-এর জন্য useNavigate ইমপোর্ট করুন

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate(); // 👈 নেভিগেশন হুক ডিক্লেয়ার করলেন

  return (
    <div className='cart'>
     <div className="cart-items">
      <div className="cart-items-title">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br/>
      <hr/>
      
      {food_list.map((item, index) => {
       if (cartItems[item._id] > 0) {
          return (
            <div key={item._id}>
              <div className='cart-items-title cart-items-item'>
                <img src={url+"/images/"+item.image} alt=""/>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p> 
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr/>
            </div> 
          )
        } 
      })}
     </div>
     <div className="cart-bottom">
       <div className="cart-total">
        <h2>Cart Total</h2>
        <div>
         {/* 💡 totol বানানটি ঠিক করে total করা হলো */}
         <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
         </div>
         <hr />
         <div className="cart-total-details">
          <p>Delivery Fee</p>
          {/* 💡 কার্ট খালি থাকলে ডেলিভারি ফি ০ দেখাবে */}
          <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
         </div>
         <hr />
         <div className="cart-total-details">
          <b>Total</b>
          {/* 💡 কার্ট খালি থাকলে মোট হিসাব ০ দেখাবে */}
          <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
         </div>
        </div>
        {/* 💡 বাটনে ক্লিক করলে প্লেস অর্ডার পেজে নিয়ে যাওয়ার লজিক যোগ করা হলো */}
        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
       </div>
       <div className="cart-promocode">
        <p>If you have a promo code, Enter it here</p>
        <div>
         <div className="cart-promocode-input">
          <input type="text" placeholder='promo code'/>
          <button>Submit</button>
         </div>
        </div>
       </div>
     </div>
    </div>
  )
}

export default Cart
