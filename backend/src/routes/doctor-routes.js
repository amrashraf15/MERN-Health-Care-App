import express from "express"
import { checkDoctor, completeDoctorAppointment, doctorAppointments, doctorDashboard, getDoctor, login, logout, updateDoctorProfile } from "../controllers/doctor-controllers.js";
import { authDoctor } from "../middleware/doctor-middleware.js";



const router = express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.get("/check-auth",authDoctor,checkDoctor);
router.get("/doctor-appointments",authDoctor,doctorAppointments);
router.get("/doctor-info",authDoctor,getDoctor);
router.put("/update-doctor-info",authDoctor,updateDoctorProfile);
router.put('/complete-appointment',authDoctor,completeDoctorAppointment);
router.get("/doctordashboard",authDoctor,doctorDashboard);


export default router;

