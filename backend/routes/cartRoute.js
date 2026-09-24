import express from "express"
// এখানে getCartItems ইম্পোর্ট করা হয়েছে
import { addToCart, getCartItems, removeFromCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)
// .get পরিবর্তন করে .post করা হলো
cartRouter.post("/remove", authMiddleware, removeFromCart) 
// এখানে getCart পরিবর্তন করে getCartItems করা হলো
cartRouter.post("/get", authMiddleware, getCartItems)

export default cartRouter;
