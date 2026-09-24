import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ১. placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,     
            amount: req.body.amount,   
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
         
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd", 
                product_data: {
                    name: item.name
                },
                unit_amount: Math.abs(item.price) * 100 
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges" 
                },
                unit_amount: 2 * 100 
            },
            quantity: 1 
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
            payment_method_types: ['card'] 
        });

        res.json({ success: true, session_url: session.url });
      
    } catch (error) {
        console.log("Stripe Session Error:", error.message);
        res.json({ success: false, message: "Error" });  
    }
};

// 💡 ২. পেমেন্ট ভেরিফাই করার চূড়ান্ত ও নিরাপদ ফাংশন
const verifyOrder = async (req, res) => {
   const { orderId, success } = req.body;
   try {
       console.log("Backend Received Data - Success:", success, "OrderID:", orderId);

       // 💡 শতভাগ নিরাপদ কন্ডিশন: success এর মান যে ফরম্যাটেই আসুক না কেন পেমেন্ট true করবে
       if (success === true || success === "true" || (success && success.toString().toLowerCase() === "true")) {
           
           // ডাটাবেজে পেমেন্ট স্ট্যাটাস true এবং অর্ডারের প্রাথমিক স্ট্যাটাস আপডেট করা হচ্ছে
           await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Food Processing" });
           return res.json({ success: true, message: "Paid Successfully" });
           
       } else {
           // 💡 সেফটি গার্ড: সরাসরি ডিলিট না করে পেমেন্ট ফেইল হিসেবে ডাটাবেজে রেখে দিন যাতে আপনি চেক করতে পারেন
           await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "Payment Failed" });
           return res.json({ success: false, message: "Not Paid" });
       }
   } catch (error) {
       console.log("Verification Server Error:", error);
       return res.json({ success: false, message: "Error" }); 
   }
};

// ইউজারের নির্দিষ্ট অর্ডারগুলো ফ্রন্টএন্ডে পাঠানোর ফাংশন
const userOrders = async (req, res) => {
    try {
        // authMiddleware থেকে আসা req.body.userId দিয়ে অর্ডার খোঁজা হচ্ছে
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("User Orders Fetch Error:", error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing orders for admin panel
const listOrders =  async (req,res) => {
  try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
  // API for updating order status
  const updateStatus = async (req,res) => {
   try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})  
   } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
   }
  }


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

