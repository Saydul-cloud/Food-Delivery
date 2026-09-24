import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // 💡 এখানে ডিফল্ট ভ্যালু হিসেবে একটি খালি অবজেক্ট {} নিশ্চিত করা হয়েছে
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(""); 
    const [food_list, setFoodList] = useState([]); 

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
          await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
          if (token) {
            axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
          }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // 💡 এখানে নিশ্চিত করা হয়েছে যেন cartItems আনডিফাইন্ড হলেও লুপ ক্র্যাশ না করে
        const currentCart = cartItems || {};
        for (const item in currentCart) {
            if (currentCart[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                if (itemInfo) {
                    totalAmount += itemInfo.price * currentCart[item];
                }
            }
        }
        return totalAmount;
    }
     
    // ব্যাকএন্ড থেকে ফুড লিস্ট নিয়ে আসার ফাংশন
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("ফুড লিস্ট লোড করতে সমস্যা হয়েছে:", error);
        }
    }

    // 💡 কার্ট ডাটা লোড করার ফাংশন (POST মেথড ও সেফটি হ্যান্ডলিং সহ)
    const loadCartData = async (apiToken) => {
        try {
            // ব্যাকএন্ডের সাথে মিল রেখে axios.post করা হয়েছে
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: apiToken } });
            if (response.data && response.data.cartData) {
                setCartItems(response.data.cartData);
            } else {
                setCartItems({}); // ডাটা না থাকলে খালি অবজেক্ট ব্যাকআপ
            }
        } catch (error) {
            console.error("কার্ট ডাটা লোড করতে সমস্যা হয়েছে:", error);
            setCartItems({}); // এরর খেলেও অ্যাপ ক্র্যাশ রোধ করবে
        }
    }

    // পেজ লোড হওয়ার সাথে সাথে ডাটা ও টোকেন লোড করার সঠিক লজিক
    useEffect(() => {
        async function loadData() {
            // ১. প্রথমে খাবারের লিস্ট লোড হবে
            await fetchFoodList();
            
            // ২. লোকাল স্টোরেজে টোকেন থাকলে সেটি সেট হবে এবং কার্ট ডাটা আসবে
            const localToken = localStorage.getItem("token");
            if (localToken) {
                setToken(localToken);
                // 💡 স্টেট আপডেট হওয়ার বিলম্ব এড়াতে সরাসরি localToken পাস করা হয়েছে
                await loadCartData(localToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,    
        setToken  
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
