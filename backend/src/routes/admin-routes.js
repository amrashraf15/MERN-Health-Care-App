import express from "express"
import { addDoctor, adminDashboard, checkAdmin, deleteAppointment, getAllAppointments, getAllDoctors, loginAdmin, logoutAdmin } from "../controllers/admin-controllers.js";
import { authAdmin } from "../middleware/admin-middleware.js";
import { changeAvailability } from "../controllers/doctor-controllers.js";

const router = express.Router();


router.post('/add-doctor',authAdmin,addDoctor);
router.post('/login',loginAdmin);
router.post('/logout',logoutAdmin);
router.get("/check-admin",authAdmin,checkAdmin);
router.get('/all-doctors',getAllDoctors);
router.put('/change-availability',authAdmin,changeAvailability)
router.get('/all-appointments',authAdmin,getAllAppointments);
router.delete('/delete-appointment',authAdmin,deleteAppointment)
router.get("/dashboard",authAdmin,adminDashboard);


export default router;