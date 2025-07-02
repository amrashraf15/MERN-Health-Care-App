import Doctor from "../models/doctor.js";
import bcrypt from "bcryptjs";
import validator from 'validator';
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.js";
import Appointment from "../models/appointment.js";
import { generateTokenAndSetCookie } from "../lib/utils.js";



export const addDoctor = async (req,res) =>{
    const {name,email,password,address,speciality,degree,experience,about,available,fees,image,phone} = req.body;
    try {
        
        if(!name || !email || !password || !address || !speciality ||  !degree || !experience || !phone || !about || !available || !fees || !image){
            return res.status(400).json({success:false,message:"All Fields are required"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Enter a vaild Email"});
        }
        if(password.length < 8){
            return res.status(400).json({success:false,message:"Password must be at least 8 characters"})
        }
        const existingDoctor = await Doctor.findOne({email});
        if(existingDoctor){
            return res.status(400).json({success:false,message:"Doctor already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const uploadResponse = await cloudinary.uploader.upload(image);
        const doctorData ={
            name,
            email,
            password:hashedPassword,
            speciality,
            address,
            degree,
            experience,
            about,
            available,
            fees,
            image:uploadResponse.secure_url,
            phone
        }
        
        const newDoctor = new Doctor(doctorData)
        await newDoctor.save()
        return res.status(201).json({success:true,message:"Doctor created successfullly",doctor:{...newDoctor._doc}})
    } catch (error) {
        console.log("error in add doctor controller :",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const loginAdmin = async (req,res) => {
    const { email,password } = req.body
    try {
        if(!email || !password){
        return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const adminUser = await User.findOne({ email });
        if(!adminUser){
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        if (adminUser.role !== "admin") {
        return res.status(403).json({ success: false, message: "You are not an admin" });
        }
        const isCorrectpassword = await bcrypt.compare(password, adminUser.password);
        if(!isCorrectpassword){
            return res.status(400).json({ success: false, message: "password is incorrect" });
        }
        generateTokenAndSetCookie(res,adminUser._id,adminUser.role);
        return res.status(200).json({ success: true, message: "Admin login successful",admin:{...adminUser._doc,password:undefined} });
    } catch (error) {
        console.log("error in loginAdmin controller :",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
export const getAllDoctors = async (req,res) => {
    try {
        const doctors = await Doctor.find().select("-password");
        res.status(200).json({success:true,message:"All Doctors fetched successfully",doctors})
        
    } catch (error) {
        console.log("error in  getAllDoctors controller :",error)
        res.status(500).json({success:false,message:error.message})
    }
}
export const checkAdmin = async (req,res) =>{
    try {
        const admin = req.user;
        if(!admin){
            return res.status(400).json({ success: false, message: "Admin not found" });
        }
        if(admin.role !== "admin"){
            return res.status(400).json({ success: false, message: "you are not an admin" });
        }
        res.status(200).json({success:true,admin:{...admin._doc,password:undefined}});
    } catch (error) {
        console.error("Error in checkAdmin:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const logoutAdmin = async (req,res) => {
    try {
        res.clearCookie("admin_token");
        res.status(200).json({success:true,message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout in admin Controller");
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}
export const getAllAppointments = async (req,res) => {
    try {
        const appointments = await Appointment.find().sort({createdAt: -1});
        res.status(200).json({success:false,message:"Appointments fetched Successfully",appointments})
    } catch (error) {
        console.error("Error in getAllAppointments:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const deleteAppointment = async (req,res) => {
    const { appointmentId } = req.body; 
    try {
        await  Appointment.findByIdAndDelete(appointmentId);
        res.status(200).json({success:true,message:"Appointments deleted Successfully"})
    } catch (error) {
        console.error("Error in deleteAppointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const adminDashboard =  async (req,res) => {
    try {
        const users = await User.find({});
        const doctors = await Doctor.find({});
        const appointments = await Appointment.find({});
        const dashData ={
            doctors:doctors.length,
            patients:users.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5) || ""
        }
        res.status(200).json({success:true,dashData});
    } catch (error) {
        console.error("Error in adminDashboard:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}