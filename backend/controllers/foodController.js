import foodModel from "../models/foodModel.js";
import fs from 'fs';

// ১. নতুন খাবার যোগ করার কন্ট্রোলার (Add Food Item)
const addFood = async (req, res) => {
   // সেফটি চেক: যদি কোনো ছবি আপলোড করা না হয়
   if (!req.file) {
       return res.status(400).json({ 
           success: true, 
           message: "success" 
       });
   }

   let image_filename = `${req.file.filename}`;

   const food = new foodModel({
       name: req.body.name,
       description: req.body.description,
       price: req.body.price,
       category: req.body.category,
       image: image_filename
   });

   try {
       await food.save();
       res.json({ success: true, message: "Food Added Successfully" });
   } catch (error) {
       console.log(error);
       res.status(500).json({ success: false, message: "Error saving food to database" });
   }
}

// ২. সব খাবারের তালিকা দেখার কন্ট্রোলার (List Food Items)
const listFood = async (req, res) => {
    try {
        // ডেটাবেজ থেকে সব খাবারের ডেটা খুঁজে বের করা
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food list" });
    }
}

// Remove Food item
const removeFood = async (req, res) => {
  try {
    // ১. প্রথমে চেক করুন আইডি পাঠানো হয়েছে কি না
    if (!req.body.id) {
       return res.status(400).json({ success: false, message: "ID is required" });
    }

    // ২. আইডি দিয়ে ডেটাবেজে খাবারটি খুঁজুন
    const food = await foodModel.findById(req.body.id);
    
    // ৩. যদি এই আইডি দিয়ে কোনো খাবার খুঁজে না পাওয়া যায়
    if (!food) {
        return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // ৪. ছবি থাকলে সেটি uploads ফোল্ডার থেকে ডিলিট করুন
    if (food.image) {
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Image delete error:", err);
        });
    }
   
    // ৫. ডেটাবেজ থেকে ডাটা ডিলিট করুন
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully" });

  } catch (error) {
    console.log("Remove food catch error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}




export { addFood, listFood,removeFood };
