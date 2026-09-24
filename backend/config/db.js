import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // নতুন 'mongodb+srv' এর বদলে ওয়াইফাই ফ্রেন্ডলি স্ট্যান্ডার্ড মাল্টি-সার্ভার লিংক ব্যবহার করা হয়েছে
        await mongoose.connect("mongodb://saydulcit7_db_user:PZc5ta1Pq0PaIunj@ac-kw5z96e-shard-00-00.nhrtyim.mongodb.net:27017,ac-kw5z96e-shard-00-01.nhrtyim.mongodb.net:27017,ac-kw5z96e-shard-00-02.nhrtyim.mongodb.net:27017/?ssl=true&replicaSet=atlas-6zee2a-shard-0&authSource=admin&appName=Cluster0");
        console.log("MongoDB Database Connected Successfully");
    } catch (error) {
        console.log("DB Connection Fail!! : ", error.message);
    }
}
