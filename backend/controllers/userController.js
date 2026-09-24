import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";

// Token Create করার ফাংশন
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "my_secret_key", { expiresIn: '3d' });
}


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        
        // ১. ইউজার না পাওয়া গেলে এরর রিটার্ন করবে
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        
        // ২. ইউজার পাওয়া গেলে পাসওয়ার্ড চেক করবে (ইফ ব্লকের বাইরে)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // ৩. পাসওয়ার্ড মিললে টোকেন তৈরি করে রেসপন্স পাঠাবে
        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log("Login Error:", error);
        return res.json({ success: false, message: "Error" });
    } 
};


// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // ১. ইমেইল দিয়ে ইউজার অলরেডি আছে কিনা চেক করা
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        
        // ২. ইমেইল ফরম্যাট ভ্যালিডেশন
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // ৩. পাসওয়ার্ড স্ট্রং কিনা চেক করা (কমপক্ষে ৮ ক্যারেক্টার)
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (min 8 chars)" });
        }

        // ৪. পাসওয়ার্ড হ্যাশ করা (Hashing Password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ৫. নতুন ইউজার তৈরি করা
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // ৬. ডাটাবেজে ইউজার সেভ করা
        const user = await newUser.save();

        // ৭. টোকেন জেনারেট করা এবং রেসপন্স পাঠানো
        const token = createToken(user._id);
        res.json({ success: true, token, message: "User Registered Successfully" });

    } catch (error) {
        // টার্মিনালে আসল এররটি দেখার জন্য এটি দরকার
        console.log("Registration Error:", error); 
        res.json({ success: false, message: error.message || "Error" });
    }
};

export { loginUser, registerUser };
