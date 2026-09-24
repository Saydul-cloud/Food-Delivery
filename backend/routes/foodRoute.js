import express from "express"
import { addFood, listFood,removeFood} from "../controllers/foodController.js" // এখানে listFood যোগ করা হয়েছে
import multer from "multer"

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage })

// ১. নতুন খাবার যোগ করার রাউট (POST Request)
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);
// ২. সব খাবারের তালিকা দেখার রাউট (GET Request)
foodRouter.get("/list",listFood) // এই নতুন লাইনটি যোগ করা হলো

export default foodRouter;
