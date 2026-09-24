import express from "express"
import authMiddleware from "../middleware/auth.js"
// 💡 এখানে verifyorder পরিবর্তন করে সঠিক বানানে verifyOrder করা হলো
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
// 💡 এখানেও রাউটের ভেতরে ফাংশনটির নাম verifyOrder করে দেওয়া হলো
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;
