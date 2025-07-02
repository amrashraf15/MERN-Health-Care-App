import express from "express"
import { bookAppointment, checkAuth, cancelAppointment, getProfile, listAppointment, login, logout, signup, updateProfile } from "../controllers/auth-controllers.js";
import { protectRoute } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/check-auth",protectRoute,checkAuth);
router.post("/logout",logout);
router.get("/get-profile",protectRoute,getProfile)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/appointments",protectRoute,listAppointment)
router.post("/book-appointment",protectRoute,bookAppointment)
router.put("/cancel-appointment",protectRoute,cancelAppointment)

export default router;