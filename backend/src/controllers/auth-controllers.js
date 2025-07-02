import { generateTokenAndSetCookie } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";




export const signup = async (req,res) => {
    const { name,email,password } = req.body;
    try {
        if( !name || !email || !password){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        if(password.length < 6){
                return res.status(400).json({ success: false, message: "password must be greater that 6 chars" });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        if(user){
            generateTokenAndSetCookie(res,user._id);
            await user.save();
            res.status(201).json({success:true,message:"User created Successfully",user:{...user._doc,password:undefined}});
        }else{
            return res.status(400).json({ success: false, message: "Invalid Data" });
        }

    } catch (error) {
        console.log("error in signup controller",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const login = async (req,res) => {
    const { email,password } = req.body;
    try {
        if( !email || !password){
            res.status(400).json({success:false,message:"all fields are required"});
        }
            const user = await User.findOne({email});
            if(!user){
                res.status(400).json({success:false,message:"Invalid Credentials"});
            }   
            const isCorrectpassword = await bcrypt.compare(password,user.password);
            if(!isCorrectpassword){
                res.status(400).json({success:false,message:"password is incorrect"});
            }
            generateTokenAndSetCookie(res,user._id,user.role);
            await user.save();
            res.status(200).json({success:true,message:"Login Successful",user:{...user._doc,password:undefined}});
        
    } catch (error) {
        console.log("Error in login Controller",error);
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}


export const logout = async (req,res) => {
    try {
        res.clearCookie("patient_token");
        res.status(200).json({success:true,message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout Controller");
        res.status(500).json({success:false,message:"Internal Serve Error!"});
    }
}

export const checkAuth = async (req,res) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(400).json({ success: false, message: "User not found" });
        }
        if(user.role !== "patient"){
            return res.status(400).json({ success: false, message: "you are not patient" });
        }
        res.status(200).json({success:true,user:{...user._doc,password:undefined}});
    } catch (error) {
        console.error("Error in checkAuth:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProfile = async (req,res) => {
    const userId = req.user._id;
        try {
            const userData = await User.findById(userId).select("-password");
            res.status(200).json({success:true,message:"Fetched Profile Successfully",user:userData});
        } catch (error) {
            console.error("Error in getProfile:", error);
            res.status(500).json({ success: false, message: error.message });
        }
}
export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  let { name, email, image, address, gender, dob, phone } = req.body;

  try {
    // Only upload image if provided as base64
    if (image && image.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      image = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, image, address, gender, dob, phone },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookAppointment = async (req,res) => {
    const userId = req.user._id;
    const { docId,slotDate,slotTime } =req.body;
    
    try {
        const docData =await Doctor.findById(docId).select("-password");
        if(!docData.available){
            return res.status(400).json({success:false,message:"Doctor is Not Available"});
        }
        let slots_booked =docData.slots_booked;
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.status(400).json({success:false,message:"Slot is Not Available"});
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await User.findById(userId).select("-password");
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }
        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();
        //save new slots in docData
        await Doctor.findByIdAndUpdate(docId,{slots_booked},{new:true})
        res.status(200).json({ success: true, message:"Appointment Booked Successfully",appointmentData });
    } catch (error) {
        console.error("Error in bookAppointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const listAppointment = async (req,res) => {
    const userId =req.user._id
    try {
        const appointments = await Appointment.find({userId}).sort({createdAt: -1});
        res.status(200).json({success:true,message:"appointments fetched successfully",appointments})
    } catch (error) {
        console.error("Error in listAppointment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const cancelAppointment = async (req, res) => {
  const userId = req.user._id;
  const { appointmentId } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Mark as cancelled
    appointment.cancelled = true;
    await appointment.save();

    // Free the slot in Doctor's slots_booked
    const doctor = await Doctor.findById(appointment.docId);
    if (doctor) {
      const date = appointment.slotDate;
      const time = appointment.slotTime;

      // Remove the booked time from the slot array for that date
      if (doctor.slots_booked?.[date]) {
        doctor.slots_booked[date] = doctor.slots_booked[date].filter((t) => t !== time);

        // If date has no more slots, delete the key
        if (doctor.slots_booked[date].length === 0) {
          delete doctor.slots_booked[date];
        }

        await doctor.save();
      }
    }

    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error("Error in cancelAppointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


