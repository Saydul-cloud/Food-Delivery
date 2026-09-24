import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        // যদি ডাটাবেজে cartData না থাকে, তবে খালি অবজেক্ট ({}) ধরে নেবে
        let cartData = userData.cartData || {}; 
        
        // ডাইনামিকালি আইটেম আইডি অনুযায়ী কোয়ান্টিটি বাড়ানো
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // 💡 মঙ্গোডিবির $set অপারেটর ব্যবহার করে নির্দিষ্ট অবজেক্ট আপডেট করা হলো
        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });
        
        res.json({success: true, message: "Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {}; 
        
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            
            // যদি কোয়ান্টিটি ০ হয়ে যায়, তবে কার্ট থেকে ওই আইডিটি মুছে দিতে পারেন (ঐচ্ছিক)
            if(cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        
        // 💡 এখানেও $set অপারেটর ব্যবহার করা হলো
        await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } });
        
        res.json({success: true, message: "Removed From Cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// fetch user cart data
const getCartItems = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {}; 
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export { addToCart, removeFromCart, getCartItems };
