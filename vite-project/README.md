# 🍅 Tomato - Full Stack Food Delivery Application

Tomato একটি সম্পূর্ণ ডাইনামিক এবং প্রফেশনাল ফুল-স্ট্যাক ফুড ডেলিভারি অ্যাপ্লিকেশন। এতে কাস্টমারদের জন্য একটি আধুনিক ইউজার ইন্টারফেস, রিয়েল-টাইম পেমেন্ট গেটওয়ে এবং অ্যাডমিনদের জন্য একটি শক্তিশালী ম্যানেজমেন্ট ড্যাশবোর্ড যুক্ত করা হয়েছে।

## 🚀 মূল ফিচারসমূহ (Key Features)

### 👤 ইউজার প্যানেল (Frontend)
- **User Authentication:** সম্পূর্ণ সিকিউর লগইন, সাইনআপ এবং লগআউট সিস্টেম।
- **Cart Management:** কার্টে খাবার যোগ/বিয়োগ এবং লাইভ টোটাল বিল হিসাবের সুবিধা।
- **Stripe Payment Gateway:** স্ট্রাইপ পেমেন্ট গেটওয়ের মাধ্যমে রিয়েল-টাইম অনলাইন পেমেন্ট সিস্টেম।
- **Live Order Tracking:** গ্রাহকদের জন্য অর্ডারের বর্তমান অবস্থা ট্র্যাক করার সুবিধা।

### 🛠️ অ্যাডমিন প্যানেল (Admin Dashboard)
- **Product CRUD:** অ্যাডমিনদের জন্য নতুন খাবার যুক্ত করা ও তালিকার বিবরণ দেখার সুবিধা।
- **Live Image Upload:** `multer` ব্যবহার করে খাবারের আসল ছবি সার্ভারে আপলোড করার সিস্টেম।
- **Order Management & Status Update:** কাস্টমারের অর্ডার তালিকা দেখা এবং ড্রপডাউনের মাধ্যমে অর্ডারের লাইভ স্ট্যাটাস (`Food Processing`, `Out for delivery`, `Delivered`) পরিবর্তন করার ক্ষমতা।

---

## 💻 ব্যবহৃত প্রযুক্তি (Tech Stack)

- **Frontend (Client & Admin):** React.js, Vite, React Router DOM, Axios, Context API, React Toastify, Pure CSS
- **Backend (Server):** Node.js, Express.js, Multer (Image Handling), JWT (Token Authentication)
- **Database:** MongoDB Cloud (Atlas) & Mongoose ODM
- **Payment Gateway:** Stripe API

---

## 🛠️ লোকালহোস্টে রান করার নিয়ম (Installation Guide)

### ১. ক্লোন করুন (Clone the Repository)
```bash
git clone https://github.com
cd tomato-food-delivery
```

### ২. ব্যাকএন্ড সেটআপ (Backend Setup)
`backend` ফোল্ডারে যান এবং একটি `.env` ফাইল তৈরি করে নিচের ভেরিয়েবলগুলো সেট করুন:
```env
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret_key
```
এরপর রান করুন:
```bash
cd backend
npm install
npm start
```

### ৩. ফ্রন্টএন্ড ও অ্যাডমিন সেটআপ (Frontend & Admin Setup)
আলাদা দুটি টার্মিনালে ফ্রন্টএন্ড এবং অ্যাডমিন ফোল্ডারে গিয়ে রান করুন:
```bash
# ফ্রন্টএন্ডের জন্য (Port: 5174)
cd frontend
npm install
npm run dev

# অ্যাডমিন প্যানেলের জন্য (Port: 5173)
cd admin/vite-project
npm install
npm run dev
```
