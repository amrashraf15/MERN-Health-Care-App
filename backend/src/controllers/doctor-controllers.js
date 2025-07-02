import { generateTokenAndSetCookieForDoctor } from "../lib/utils.js";
import Doctor from "../models/doctor.js";
import Appointment from "../models/appointment.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


export const changeAvailability = async (req,res) => {
    const { id } =req.body;
    try {
        if (!id) {
        return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }
        const docData = await Doctor.findById(id);
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
            }
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { available: !docData.available },{ new: true });
        res.status(200).json({ success: true, message: "Availability Changed Successfully",updatedDoctor });
    } catch (error) {
        console.log("Error in changeAvailability Controller");
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}

export const login = async (req,res) => {
    const { email,password } =req.body;
    try {
        if(!email || !password){
            res.status(400).json({success:false,message:"all fields are required"});
        }   
        const doctor = await Doctor.findOne({email});
        if(!doctor){
            res.status(400).json({success:false,message:"Invalid Credentials"});
        }
        const isCorrectpassword = await bcrypt.compare(password,doctor.password);
        if(!isCorrectpassword){
                res.status(400).json({success:false,message:"password is incorrect"});
        }
        generateTokenAndSetCookieForDoctor(res,doctor._id);
        await doctor.save();
        res.status(200).json({success:true,message:"Login Successful",doctor:{...doctor._doc,password:undefined}});
    } catch (error) {
        console.log("Error in Doctor login Controller",error);
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}
export const logout = async (req,res) => {
    try {
        res.clearCookie("doctor_token");
        res.status(200).json({success:true,message:"Doctor Logged out successfully"});
    } catch (error) {
        console.log("Error in Doctorlogout Controller");
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}
export const checkDoctor = async (req,res) =>{
    try {
        const doctor = req.doctor;
        if(!doctor){
            return res.status(400).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({success:true,doctor:{...doctor._doc,password:undefined}});
    } catch (error) {
        console.error("Error in checkDoctor:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const doctorAppointments = async (req,res) =>{
    const docId = req.doctor._id;
    try {
        const appointments = await Appointment.find({ docId });
        const latestAppointments = appointments.reverse(); 
        res.status(200).json({success:true,message:"Appointments fetched successfully",latestAppointments});
    } catch (error) {
        console.error("Error in  doctorAppointments:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getDoctor = async (req,res) => {
    const docId = req.doctor._id;
        try {
            const doctorData = await Doctor.findById(docId).select("-password");
            res.status(200).json({success:true,message:"Fetched Profile Successfully",doctor:doctorData});
        } catch (error) {
            console.error("Error in getDoctor:", error);
            res.status(500).json({ success: false, message: error.message });
        }
}

export const updateDoctorProfile = async (req, res) => {
  const docId = req.doctor._id;
  let { name, email, image, address, speciality, fees,degree, about, available ,experience,phone } = req.body;

  try {
    // Only upload image if provided as base64
    if (image && image.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      image = uploadResponse.secure_url;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { name, email, image, address, speciality, fees,degree, about, available ,experience,phone },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Doctor Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error in updateDoctorProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeDoctorAppointment = async (req,res) => {
    const { appointmentId } = req.body; 
    try {
        await  Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true});
        res.status(200).json({success:true,message:"Appointments Completed Successfully"})
    } catch (error) {
        console.error("Error in completeDoctorAppointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const doctorDashboard = async (req, res) => {
  const docId = req.doctor._id;

  try {
    const appointments = await Appointment.find({ docId });

    let earnings = 0;
    const patientSet = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted) {
        earnings += item.amount;
      }
      patientSet.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({ success: true, dashData });
  } catch (error) {
    console.error("Error in doctorDashboard:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



