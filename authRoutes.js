// import express from "express";
// import {
//   signup,
//   login,
//   getMe,
//   forgotPassword,
//   resetPassword,
//   editProfile

// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/me", protect, getMe);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword); 
// router.patch("/profile", protect, editProfile);

// export default router;



import express from "express";
import {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  editProfile,
  getFavourites,    // 🛠️ Naya controller function
  toggleFavourite   // 🛠️ Naya controller function
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword); 
router.patch("/profile", protect, editProfile);

/* ================= WISHLIST ROUTES ================= */
// 1. Wishlist ka sara data lene ke liye (Fixes Homepage.jsx line 88 error)
router.get("/wishlist", protect, getFavourites);

// 2. Wishlist mein song add ya remove karne ke liye
router.post("/wishlist/toggle", protect, toggleFavourite);

export default router;




